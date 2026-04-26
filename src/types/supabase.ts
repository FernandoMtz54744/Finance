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
    PostgrestVersion: "13.0.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categorias: {
        Row: {
          descripcion: string
          icono: string
          idCategoria: number
        }
        Insert: {
          descripcion: string
          icono: string
          idCategoria?: number
        }
        Update: {
          descripcion?: string
          icono?: string
          idCategoria?: number
        }
        Relationships: []
      }
      efectivo: {
        Row: {
          denominaciones: Json
          fecha: string
          id: number
          idUsuario: string
        }
        Insert: {
          denominaciones: Json
          fecha: string
          id?: number
          idUsuario?: string
        }
        Update: {
          denominaciones?: Json
          fecha?: string
          id?: number
          idUsuario?: string
        }
        Relationships: []
      }
      movimientos: {
        Row: {
          cantidad: number
          fecha: string
          id: number
          idCategoria: number
          idPeriodo: number
          motivo: string
          tipo: string
        }
        Insert: {
          cantidad: number
          fecha: string
          id?: number
          idCategoria: number
          idPeriodo: number
          motivo: string
          tipo: string
        }
        Update: {
          cantidad?: number
          fecha?: string
          id?: number
          idCategoria?: number
          idPeriodo?: number
          motivo?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "movimientos_idCategoria_fkey"
            columns: ["idCategoria"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["idCategoria"]
          },
          {
            foreignKeyName: "movimientos_idPeriodo_fkey"
            columns: ["idPeriodo"]
            isOneToOne: false
            referencedRelation: "periodos"
            referencedColumns: ["id"]
          },
        ]
      }
      periodos: {
        Row: {
          documento: string | null
          fechaCorte: string
          fechaInicio: string
          id: number
          idTarjeta: number
          nombre: string
          saldoFinal: number
          saldoInicial: number
          validado: boolean
        }
        Insert: {
          documento?: string | null
          fechaCorte: string
          fechaInicio: string
          id?: number
          idTarjeta: number
          nombre: string
          saldoFinal: number
          saldoInicial: number
          validado?: boolean
        }
        Update: {
          documento?: string | null
          fechaCorte?: string
          fechaInicio?: string
          id?: number
          idTarjeta?: number
          nombre?: string
          saldoFinal?: number
          saldoInicial?: number
          validado?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "periodos_idTarjeta_fkey"
            columns: ["idTarjeta"]
            isOneToOne: false
            referencedRelation: "tarjetas"
            referencedColumns: ["id"]
          },
        ]
      }
      saldos: {
        Row: {
          efectivo: Json
          fecha: string
          id: number
          idUsuario: string
          tarjetas: Json
        }
        Insert: {
          efectivo: Json
          fecha: string
          id?: number
          idUsuario?: string
          tarjetas: Json
        }
        Update: {
          efectivo?: Json
          fecha?: string
          id?: number
          idUsuario?: string
          tarjetas?: Json
        }
        Relationships: []
      }
      tarjetas: {
        Row: {
          color: string
          correo: string
          diaCorte: number
          id: number
          nombre: string
          tipo: string
          usuario: string
        }
        Insert: {
          color: string
          correo: string
          diaCorte: number
          id?: number
          nombre: string
          tipo: string
          usuario?: string
        }
        Update: {
          color?: string
          correo?: string
          diaCorte?: number
          id?: number
          nombre?: string
          tipo?: string
          usuario?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calcular_saldo_final: {
        Args: { p_periodo_id: number }
        Returns: undefined
      }
      get_tarjetas_con_ultimo_periodo: {
        Args: { usuario_param: string }
        Returns: Json
      }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
