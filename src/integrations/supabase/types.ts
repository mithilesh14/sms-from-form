export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          performed_by: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          performed_by?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          performed_by?: string | null
        }
        Relationships: []
      }
      blocked_dates: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          property_id: string
          reason: string | null
          start_date: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          property_id: string
          reason?: string | null
          start_date: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          property_id?: string
          reason?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocked_dates_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          admin_notes: string | null
          check_in_date: string
          check_out_date: string
          cleaning_fee: number | null
          created_at: string | null
          discount_applied: number | null
          guest_country: string | null
          guest_email: string
          guest_name: string
          guest_phone: string | null
          id: string
          is_returning_customer: boolean | null
          nightly_rate: number
          num_guests: number | null
          property_id: string
          special_requests: string | null
          status: string
          subtotal: number
          total_amount: number
          total_nights: number
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          check_in_date: string
          check_out_date: string
          cleaning_fee?: number | null
          created_at?: string | null
          discount_applied?: number | null
          guest_country?: string | null
          guest_email: string
          guest_name: string
          guest_phone?: string | null
          id?: string
          is_returning_customer?: boolean | null
          nightly_rate: number
          num_guests?: number | null
          property_id: string
          special_requests?: string | null
          status?: string
          subtotal: number
          total_amount: number
          total_nights: number
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          check_in_date?: string
          check_out_date?: string
          cleaning_fee?: number | null
          created_at?: string | null
          discount_applied?: number | null
          guest_country?: string | null
          guest_email?: string
          guest_name?: string
          guest_phone?: string | null
          id?: string
          is_returning_customer?: boolean | null
          nightly_rate?: number
          num_guests?: number | null
          property_id?: string
          special_requests?: string | null
          status?: string
          subtotal?: number
          total_amount?: number
          total_nights?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          client_type: string | null
          country: string | null
          created_at: string | null
          email: string
          id: string
          is_returning_customer: boolean | null
          name: string
          notes: string | null
          phone: string | null
          tags: string[] | null
          total_bookings: number | null
          total_spent: number | null
          updated_at: string | null
        }
        Insert: {
          client_type?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_returning_customer?: boolean | null
          name: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          total_bookings?: number | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Update: {
          client_type?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_returning_customer?: boolean | null
          name?: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          total_bookings?: number | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      consent_logs: {
        Row: {
          consent_details: Json | null
          consent_given: boolean
          consent_type: string
          created_at: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
          visitor_email: string | null
          visitor_name: string | null
          withdrawn_at: string | null
        }
        Insert: {
          consent_details?: Json | null
          consent_given?: boolean
          consent_type: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          visitor_email?: string | null
          visitor_name?: string | null
          withdrawn_at?: string | null
        }
        Update: {
          consent_details?: Json | null
          consent_given?: boolean
          consent_type?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          visitor_email?: string | null
          visitor_name?: string | null
          withdrawn_at?: string | null
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      data_rights_requests: {
        Row: {
          admin_notes: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          id: string
          request_type: string
          requester_email: string
          requester_name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          request_type: string
          requester_email: string
          requester_name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          request_type?: string
          requester_email?: string
          requester_name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: string[] | null
          bathrooms: number
          bedrooms: number
          created_at: string | null
          description: string | null
          description_fr: string | null
          featured_image: string | null
          floor: number | null
          floor_plan_image: string | null
          high_season_end: string | null
          high_season_nightly_rate: number | null
          high_season_start: string | null
          id: string
          images: string[] | null
          is_available: boolean | null
          is_for_sale: boolean | null
          is_long_term_rental: boolean | null
          is_short_term_rental: boolean | null
          min_stay_nights: number | null
          monthly_rate: number | null
          name: string
          name_fr: string | null
          nightly_rate: number | null
          property_type: string
          sale_price: number | null
          size_sqft: number | null
          status: string | null
          updated_at: string | null
          weekly_rate: number | null
        }
        Insert: {
          amenities?: string[] | null
          bathrooms?: number
          bedrooms?: number
          created_at?: string | null
          description?: string | null
          description_fr?: string | null
          featured_image?: string | null
          floor?: number | null
          floor_plan_image?: string | null
          high_season_end?: string | null
          high_season_nightly_rate?: number | null
          high_season_start?: string | null
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          is_for_sale?: boolean | null
          is_long_term_rental?: boolean | null
          is_short_term_rental?: boolean | null
          min_stay_nights?: number | null
          monthly_rate?: number | null
          name: string
          name_fr?: string | null
          nightly_rate?: number | null
          property_type: string
          sale_price?: number | null
          size_sqft?: number | null
          status?: string | null
          updated_at?: string | null
          weekly_rate?: number | null
        }
        Update: {
          amenities?: string[] | null
          bathrooms?: number
          bedrooms?: number
          created_at?: string | null
          description?: string | null
          description_fr?: string | null
          featured_image?: string | null
          floor?: number | null
          floor_plan_image?: string | null
          high_season_end?: string | null
          high_season_nightly_rate?: number | null
          high_season_start?: string | null
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          is_for_sale?: boolean | null
          is_long_term_rental?: boolean | null
          is_short_term_rental?: boolean | null
          min_stay_nights?: number | null
          monthly_rate?: number | null
          name?: string
          name_fr?: string | null
          nightly_rate?: number | null
          property_type?: string
          sale_price?: number | null
          size_sqft?: number | null
          status?: string | null
          updated_at?: string | null
          weekly_rate?: number | null
        }
        Relationships: []
      }
      rental_applications: {
        Row: {
          admin_notes: string | null
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          created_at: string | null
          desired_move_in: string | null
          id: string
          lease_duration: number | null
          message: string | null
          monthly_income: number | null
          occupation: string | null
          property_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          created_at?: string | null
          desired_move_in?: string | null
          id?: string
          lease_duration?: number | null
          message?: string | null
          monthly_income?: number | null
          occupation?: string | null
          property_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          created_at?: string | null
          desired_move_in?: string | null
          id?: string
          lease_duration?: number | null
          message?: string | null
          monthly_income?: number | null
          occupation?: string | null
          property_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_applications_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          admin_notes: string | null
          booking_id: string | null
          booking_reference: string | null
          content: string | null
          created_at: string | null
          id: string
          is_approved: boolean | null
          is_hidden: boolean | null
          is_verified: boolean | null
          property_id: string
          rating: number
          reviewer_email: string
          reviewer_name: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          booking_id?: string | null
          booking_reference?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_hidden?: boolean | null
          is_verified?: boolean | null
          property_id: string
          rating: number
          reviewer_email: string
          reviewer_name: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          booking_id?: string | null
          booking_reference?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          is_hidden?: boolean | null
          is_verified?: boolean | null
          property_id?: string
          rating?: number
          reviewer_email?: string
          reviewer_name?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_inquiries: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          offer_amount: number | null
          phone: string | null
          preferred_contact_method: string | null
          property_id: string
          status: string | null
          updated_at: string | null
          viewing_date: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          offer_amount?: number | null
          phone?: string | null
          preferred_contact_method?: string | null
          property_id: string
          status?: string | null
          updated_at?: string | null
          viewing_date?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          offer_amount?: number | null
          phone?: string | null
          preferred_contact_method?: string | null
          property_id?: string
          status?: string | null
          updated_at?: string | null
          viewing_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_inquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value?: Json | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      tour_requests: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          property_id: string | null
          status: string | null
          tour_type: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          property_id?: string | null
          status?: string | null
          tour_type?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          property_id?: string | null
          status?: string | null
          tour_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tour_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
