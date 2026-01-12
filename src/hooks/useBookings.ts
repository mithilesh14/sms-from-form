import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Booking = Tables<'bookings'>;
export type BookingInsert = TablesInsert<'bookings'>;
export type BookingUpdate = TablesUpdate<'bookings'>;

export function useBookings(filters?: {
  status?: string;
  propertyId?: string;
}) {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: async () => {
      let query = supabase
        .from('bookings')
        .select('*, properties(name, name_fr)')
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.propertyId) {
        query = query.eq('property_id', filters.propertyId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });
}

export function usePropertyBookings(propertyId: string) {
  return useQuery({
    queryKey: ['bookings', 'property', propertyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('property_id', propertyId)
        .in('status', ['pending_payment', 'payment_received', 'confirmed'])
        .order('check_in_date', { ascending: true });

      if (error) throw error;
      return data as Booking[];
    },
    enabled: !!propertyId,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: BookingInsert) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: BookingUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useBookingStats() {
  return useQuery({
    queryKey: ['bookings', 'stats'],
    queryFn: async () => {
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('status, total_amount, created_at');

      if (error) throw error;

      const stats = {
        totalRevenue: 0,
        pendingPayments: 0,
        confirmedBookings: 0,
        pendingBookings: 0,
      };

      bookings?.forEach((booking) => {
        if (booking.status === 'confirmed' || booking.status === 'completed') {
          stats.totalRevenue += Number(booking.total_amount) || 0;
          stats.confirmedBookings++;
        }
        if (booking.status === 'pending_payment') {
          stats.pendingBookings++;
        }
        if (booking.status === 'payment_received') {
          stats.pendingPayments++;
        }
      });

      return stats;
    },
  });
}
