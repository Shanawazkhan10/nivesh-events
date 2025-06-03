export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          created_at: string
          user_id: string
          category: string
          name: string
          description: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          category: string
          name: string
          description?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          category?: string
          name?: string
          description?: string | null
          metadata?: Json | null
        }
      }
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          display_name: string | null
          avatar_url: string | null
          role: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          display_name?: string | null
          avatar_url?: string | null
          role?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          display_name?: string | null
          avatar_url?: string | null
          role?: string
        }
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
  }
}