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
      authority: {
        Row: {
          code_name: string | null
          created_at: string
          deleted: boolean | null
          grade_index: number | null
          id: string
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          code_name?: string | null
          created_at?: string
          deleted?: boolean | null
          grade_index?: number | null
          id?: string
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          code_name?: string | null
          created_at?: string
          deleted?: boolean | null
          grade_index?: number | null
          id?: string
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      content: {
        Row: {
          created_at: string
          deleted: boolean | null
          description_id: string | null
          document_name: string | null
          document_url: string | null
          id: string
          image_name: string | null
          image_url: string | null
          link_url: string | null
          order_id: string | null
          tags_id: string | null
          title_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          description_id?: string | null
          document_name?: string | null
          document_url?: string | null
          id?: string
          image_name?: string | null
          image_url?: string | null
          link_url?: string | null
          order_id?: string | null
          tags_id?: string | null
          title_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          description_id?: string | null
          document_name?: string | null
          document_url?: string | null
          id?: string
          image_name?: string | null
          image_url?: string | null
          link_url?: string | null
          order_id?: string | null
          tags_id?: string | null
          title_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_description_id_fkey"
            columns: ["description_id"]
            isOneToOne: false
            referencedRelation: "textDescription"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_tags_id_fkey"
            columns: ["tags_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "textTitle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      departmentGroup: {
        Row: {
          created_at: string
          deleted: boolean | null
          parent_dep_id: string
          sub_dep_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          parent_dep_id: string
          sub_dep_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          parent_dep_id?: string
          sub_dep_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departmentGroup_parent_dep_id_fkey"
            columns: ["parent_dep_id"]
            isOneToOne: false
            referencedRelation: "parentDepartment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "departmentGroup_sub_dep_id_fkey"
            columns: ["sub_dep_id"]
            isOneToOne: false
            referencedRelation: "subDepartment"
            referencedColumns: ["id"]
          }
        ]
      }
      footer: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          ir_contact: string | null
          recruit_contact: string | null
          text_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          ir_contact?: string | null
          recruit_contact?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          ir_contact?: string | null
          recruit_contact?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "footer_text_id_fkey"
            columns: ["text_id"]
            isOneToOne: false
            referencedRelation: "textGeneral"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "footer_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      history: {
        Row: {
          announce_at: string | null
          created_at: string
          deleted: boolean | null
          id: string
          order_id: string | null
          text_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          announce_at?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          order_id?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          announce_at?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          order_id?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "history_text_id_fkey"
            columns: ["text_id"]
            isOneToOne: false
            referencedRelation: "textHistory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "history_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      menuCategory: {
        Row: {
          authority_id: string | null
          category_index: number | null
          created_at: string
          deleted: boolean | null
          id: string
          menu_category_code: string | null
          text_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          authority_id?: string | null
          category_index?: number | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          menu_category_code?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          authority_id?: string | null
          category_index?: number | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          menu_category_code?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menuCategory_authority_id_fkey"
            columns: ["authority_id"]
            isOneToOne: false
            referencedRelation: "authority"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menuCategory_text_id_fkey"
            columns: ["text_id"]
            isOneToOne: false
            referencedRelation: "textMenu"
            referencedColumns: ["id"]
          }
        ]
      }
      menuGroup: {
        Row: {
          created_at: string
          deleted: boolean | null
          menu_category_id: string
          menu_list_id: string
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          menu_category_id: string
          menu_list_id: string
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          menu_category_id?: string
          menu_list_id?: string
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menuGroup_menu_category_id_fkey"
            columns: ["menu_category_id"]
            isOneToOne: false
            referencedRelation: "menuCategory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menuGroup_menu_list_id_fkey"
            columns: ["menu_list_id"]
            isOneToOne: false
            referencedRelation: "menuList"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menuGroup_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      menuList: {
        Row: {
          authority_id: string | null
          created_at: string
          deleted: boolean | null
          id: string
          menu_code: string | null
          menu_index: number | null
          text_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          authority_id?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          menu_code?: string | null
          menu_index?: number | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          authority_id?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          menu_code?: string | null
          menu_index?: number | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menuList_authority_id_fkey"
            columns: ["authority_id"]
            isOneToOne: false
            referencedRelation: "authority"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menuList_text_id_fkey"
            columns: ["text_id"]
            isOneToOne: false
            referencedRelation: "textMenu"
            referencedColumns: ["id"]
          }
        ]
      }
      orderIndex: {
        Row: {
          category_order_type: string | null
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
          category_order_type?: string | null
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
          category_order_type?: string | null
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
      parentDepartment: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          order_id: string | null
          text_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          order_id?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          order_id?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parentDepartment_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parentDepartment_text_id_fkey"
            columns: ["text_id"]
            isOneToOne: false
            referencedRelation: "textGeneral"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parentDepartment_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      policy: {
        Row: {
          created_at: string
          deleted: boolean | null
          description_id: string | null
          id: number
          order_id: string | null
          title_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          description_id?: string | null
          id?: number
          order_id?: string | null
          title_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          description_id?: string | null
          id?: number
          order_id?: string | null
          title_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policy_description_id_fkey"
            columns: ["description_id"]
            isOneToOne: false
            referencedRelation: "textDescription"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "textTitle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policy_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          authority_id: string | null
          avatar_name: string | null
          avatar_url: string | null
          created_at: string | null
          deleted: boolean | null
          email: string | null
          full_name: string | null
          id: string
          parent_dep_id: string | null
          sub_dep_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          authority_id?: string | null
          avatar_name?: string | null
          avatar_url?: string | null
          created_at?: string | null
          deleted?: boolean | null
          email?: string | null
          full_name?: string | null
          id: string
          parent_dep_id?: string | null
          sub_dep_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          authority_id?: string | null
          avatar_name?: string | null
          avatar_url?: string | null
          created_at?: string | null
          deleted?: boolean | null
          email?: string | null
          full_name?: string | null
          id?: string
          parent_dep_id?: string | null
          sub_dep_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_authority_id_fkey"
            columns: ["authority_id"]
            isOneToOne: false
            referencedRelation: "authority"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_parent_dep_id_fkey"
            columns: ["parent_dep_id"]
            isOneToOne: false
            referencedRelation: "parentDepartment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_sub_dep_id_fkey"
            columns: ["sub_dep_id"]
            isOneToOne: false
            referencedRelation: "subDepartment"
            referencedColumns: ["id"]
          }
        ]
      }
      section: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          image_name: string | null
          image_url: string | null
          link_url: string | null
          more_id: string | null
          order_id: string | null
          sub_title_id: string | null
          title_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          image_name?: string | null
          image_url?: string | null
          link_url?: string | null
          more_id?: string | null
          order_id?: string | null
          sub_title_id?: string | null
          title_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          image_name?: string | null
          image_url?: string | null
          link_url?: string | null
          more_id?: string | null
          order_id?: string | null
          sub_title_id?: string | null
          title_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "section_more_id_fkey"
            columns: ["more_id"]
            isOneToOne: false
            referencedRelation: "textMore"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "section_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "section_sub_title_id_fkey"
            columns: ["sub_title_id"]
            isOneToOne: false
            referencedRelation: "textSubTitle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "section_title_id_fkey"
            columns: ["title_id"]
            isOneToOne: false
            referencedRelation: "textTitle"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "section_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      subDepartment: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          order_id: string | null
          text_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          order_id?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          order_id?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subDepartment_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subDepartment_text_id_fkey"
            columns: ["text_id"]
            isOneToOne: false
            referencedRelation: "textGeneral"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subDepartment_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          order_id: string | null
          text_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          order_id?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          order_id?: string | null
          text_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orderIndex"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tags_text_id_fkey"
            columns: ["text_id"]
            isOneToOne: false
            referencedRelation: "textGeneral"
            referencedColumns: ["id"]
          }
        ]
      }
      textDescription: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          text_en: string | null
          text_ko: string | null
          text_type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
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
      textGeneral: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          text_en: string | null
          text_ko: string | null
          text_type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "textGeneral_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      textHistory: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          text_en: string | null
          text_ko: string | null
          text_type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "textHistory_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      textMenu: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          text_en: string | null
          text_ko: string | null
          text_type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "textMenu_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      textMore: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          text_en: string | null
          text_ko: string | null
          text_type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "textMore_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      textSubTitle: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          text_en: string | null
          text_ko: string | null
          text_type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "textSubTitle_update_user_id_fkey"
            columns: ["update_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      textTitle: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          text_en: string | null
          text_ko: string | null
          text_type: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          text_en?: string | null
          text_ko?: string | null
          text_type?: string | null
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

// export type Tables<
//   PublicTableNameOrOptions extends
//     | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
//         Database[PublicTableNameOrOptions["schema"]]["Views"])
//     : never = never
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
//       Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
//       Row: infer R
//     }
//     ? R
//     : never
//   : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
//       Database["public"]["Views"])
//   ? (Database["public"]["Tables"] &
//       Database["public"]["Views"])[PublicTableNameOrOptions] extends {
//       Row: infer R
//     }
//     ? R
//     : never
//   : never

// export type TablesInsert<
//   PublicTableNameOrOptions extends
//     | keyof Database["public"]["Tables"]
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
//     : never = never
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Insert: infer I
//     }
//     ? I
//     : never
//   : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
//   ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
//       Insert: infer I
//     }
//     ? I
//     : never
//   : never

// export type TablesUpdate<
//   PublicTableNameOrOptions extends
//     | keyof Database["public"]["Tables"]
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
//     : never = never
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Update: infer U
//     }
//     ? U
//     : never
//   : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
//   ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
//       Update: infer U
//     }
//     ? U
//     : never
//   : never

// export type Enums<
//   PublicEnumNameOrOptions extends
//     | keyof Database["public"]["Enums"]
//     | { schema: keyof Database },
//   EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
//     : never = never
// > = PublicEnumNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
//   : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
//   ? Database["public"]["Enums"][PublicEnumNameOrOptions]
//   : never
