type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

interface SupabaseDataBase {
  public: {
    Tables: {
      archiveGroup: {
        Row: {
          archive_id: string
          archive_order_id: string
          created_at: string
          deleted: boolean | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          archive_id: string
          archive_order_id: string
          created_at?: string
          deleted?: boolean | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          archive_id?: string
          archive_order_id?: string
          created_at?: string
          deleted?: boolean | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "archiveGroup_archive_id_fkey"
            columns: ["archive_id"]
            isOneToOne: false
            referencedRelation: "archiveImage"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archiveGroup_archive_order_id_fkey"
            columns: ["archive_order_id"]
            isOneToOne: false
            referencedRelation: "archiveIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archiveGroup_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "portfolio"
            referencedColumns: ["id"]
          }
        ]
      }
      archiveImage: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          title: string | null
          update_user_id: string | null
          updated_at: string | null
          url: string | null
          years: number | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          url?: string | null
          years?: number | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          url?: string | null
          years?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "archiveImage_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      archiveIndex: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          index: number | null
          title: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          index?: number | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          index?: number | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "archiveIndex_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      blog: {
        Row: {
          created_at: string
          deleted: boolean | null
          desc: string | null
          id: string
          like: number | null
          raw_article: string | null
          title: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          desc?: string | null
          id?: string
          like?: number | null
          raw_article?: string | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          desc?: string | null
          id?: string
          like?: number | null
          raw_article?: string | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      blogComment: {
        Row: {
          blog_id: string | null
          created_at: string
          deleted: boolean | null
          id: string
          message: string | null
          name: string | null
          password: string | null
          updated_at: string | null
        }
        Insert: {
          blog_id?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          message?: string | null
          name?: string | null
          password?: string | null
          updated_at?: string | null
        }
        Update: {
          blog_id?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          message?: string | null
          name?: string | null
          password?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blogComment_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blog"
            referencedColumns: ["id"]
          }
        ]
      }
      leaveCounterColor: {
        Row: {
          color: string | null
          created_at: string
          deleted: boolean | null
          id: string
          percent: number | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          percent?: number | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          percent?: number | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leaveCounterColor_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      main: {
        Row: {
          category: string | null
          created_at: string
          deleted: boolean | null
          desc_id: string | null
          id: string
          index: number | null
          orderId: string | null
          text_id: string | null
          text_type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          desc_id?: string | null
          id?: string
          index?: number | null
          orderId?: string | null
          text_id?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          desc_id?: string | null
          id?: string
          index?: number | null
          orderId?: string | null
          text_id?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "main_desc_id_fkey"
            columns: ["desc_id"]
            isOneToOne: false
            referencedRelation: "textDescription"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "main_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "main_text_id_fkey"
            columns: ["text_id"]
            isOneToOne: false
            referencedRelation: "textTitle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "main_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      orderIndex: {
        Row: {
          category: string | null
          created_at: string
          deleted: boolean | null
          id: string
          index: number | null
          sub_type: string | null
          type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          index?: number | null
          sub_type?: string | null
          type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          index?: number | null
          sub_type?: string | null
          type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orderIndex_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      pageMenu: {
        Row: {
          created_at: string
          deleted: boolean | null
          icon: string | null
          id: string
          image_url: string | null
          menu_type: string | null
          order_id: string | null
          title: string | null
          update_user_id: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          icon?: string | null
          id?: string
          image_url?: string | null
          menu_type?: string | null
          order_id?: string | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          icon?: string | null
          id?: string
          image_url?: string | null
          menu_type?: string | null
          order_id?: string | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pageMenu_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pageMenu_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      portfolio: {
        Row: {
          alt: string | null
          created_at: string | null
          deleted: boolean | null
          desc: string | null
          id: string
          image: string | null
          order_id: string | null
          thumbnail: string | null
          title: string | null
          update_user_id: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          alt?: string | null
          created_at?: string | null
          deleted?: boolean | null
          desc?: string | null
          id?: string
          image?: string | null
          order_id?: string | null
          thumbnail?: string | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          alt?: string | null
          created_at?: string | null
          deleted?: boolean | null
          desc?: string | null
          id?: string
          image?: string | null
          order_id?: string | null
          thumbnail?: string | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          admin: boolean | null
          avatar_url: string | null
          created_at: string | null
          deleted: boolean | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          admin?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          deleted?: boolean | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          admin?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          deleted?: boolean | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      stackLogo: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          index: number | null
          order_id: string | null
          title: string | null
          update_user_id: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          index?: number | null
          order_id?: string | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          index?: number | null
          order_id?: string | null
          title?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stackLogo_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stackLogo_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      textDescription: {
        Row: {
          category: string | null
          created_at: string
          deleted: boolean | null
          en: string | null
          id: string
          index: number | null
          ko: string | null
          type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          en?: string | null
          id?: string
          index?: number | null
          ko?: string | null
          type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          en?: string | null
          id?: string
          index?: number | null
          ko?: string | null
          type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "textDescription_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      textTitle: {
        Row: {
          category: string | null
          created_at: string
          deleted: boolean | null
          en: string | null
          id: string
          index: number | null
          ko: string | null
          type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          en?: string | null
          id?: string
          index?: number | null
          ko?: string | null
          type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          deleted?: boolean | null
          en?: string | null
          id?: string
          index?: number | null
          ko?: string | null
          type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "textTitle_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
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
