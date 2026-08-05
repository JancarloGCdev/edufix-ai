"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  UserCheck,
  GraduationCap,
  Wrench,
  Shield,
  Search,
  Edit3,
  CheckCircle2,
  Clock,
  Activity,
  BarChart3,
  TrendingUp,
  Filter,
  Check,
  Lock,
  ArrowUpDown,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { BottomNavigation } from "@/src/components/dashboard";
import type { AuthUser } from "@/src/services/auth/session";
import {
  fetchAllUsersAction,
  fetchAdminMetricsAction,
  updateUserRoleAction,
  RealUserItem,
  AdminMetricsData,
} from "@/src/features/users/actions";

export type UserRole = "STUDENT" | "TEACHER" | "MAINTENANCE" | "ADMIN";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetUser?: string;
  newRole?: UserRole;
}

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-1",
    timestamp: "Hace 5 min",
    actor: "Sistema EduFix AI",
    action: "Conectado a la base de datos PostgreSQL en tiempo real",
  },
  {
    id: "log-2",
    timestamp: "Hace 20 min",
    actor: "Google OAuth",
    action: "Autenticación segura de cuenta institucional",
  },
];

interface AdminDashboardViewProps {
  user: AuthUser;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ user }) => {
  const [users, setUsers] = useState<RealUserItem[]>([]);
  const [metrics, setMetrics] = useState<AdminMetricsData>({
    totalUsers: 0,
    activeUsersToday: 0,
    countStudents: 0,
    countTeachers: 0,
    countMaintenance: 0,
    countAdmins: 0,
    totalReports: 0,
    resolvedReports: 0,
  });
  const [loading, setLoading] = useState(true);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Modal para administrar rol
  const [editingUser, setEditingUser] = useState<RealUserItem | null>(null);
  const [newSelectedRole, setNewSelectedRole] = useState<UserRole>("STUDENT");
  const [isConfirming, setIsConfirming] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Cargar usuarios reales y métricas desde PostgreSQL
  const loadRealData = async () => {
    setLoading(true);
    try {
      const [realUsers, realMetrics] = await Promise.all([
        fetchAllUsersAction(),
        fetchAdminMetricsAction(),
      ]);

      setUsers(realUsers);
      setMetrics(realMetrics);
    } catch (err) {
      console.error("Error al cargar datos reales de administración:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRealData();
  }, []);

  // Filtrar y ordenar usuarios reales
  const filteredUsers = users
    .filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole =
        selectedRoleFilter === "ALL" || u.role === selectedRoleFilter;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        // date sorting
        return sortOrder === "asc"
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt);
      }
    });

  const handleOpenEditModal = (u: RealUserItem) => {
    setEditingUser(u);
    setNewSelectedRole(u.role);
    setIsConfirming(false);
  };

  const handleConfirmSaveRole = async () => {
    if (!editingUser) return;

    // Regla de seguridad: Administrador no puede quitarse su propio rol de ADMIN
    if (editingUser.email === user.email && newSelectedRole !== "ADMIN") {
      setToastMessage({
        text: "Seguridad: No puedes quitarte tu propio rol de Administrador.",
        type: "error",
      });
      setIsConfirming(false);
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    // Ejecutar Server Action para actualizar en PostgreSQL
    const result = await updateUserRoleAction(editingUser.id, newSelectedRole, user.email || undefined);

    if (result.success) {
      // Actualizar estado local inmediatamente
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, role: newSelectedRole } : u))
      );

      const roleLabels: Record<UserRole, string> = {
        STUDENT: "Estudiante",
        TEACHER: "Coordinador",
        MAINTENANCE: "Mantenimiento",
        ADMIN: "Administrador",
      };

      // Registrar auditoría
      const newLog: AuditLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: "Ahora mismo",
        actor: user.name || "Administrador",
        action: `Actualizó el rol de ${editingUser.name} a ${roleLabels[newSelectedRole]} en la DB`,
        targetUser: editingUser.name,
        newRole: newSelectedRole,
      };

      setAuditLogs((prev) => [newLog, ...prev]);
      setToastMessage({
        text: `¡Rol de ${editingUser.name} actualizado a ${roleLabels[newSelectedRole]} en PostgreSQL con éxito!`,
        type: "success",
      });
      
      // Recargar métricas reales
      loadRealData();
    } else {
      setToastMessage({
        text: result.error || "Ocurrió un error al actualizar el rol en la base de datos.",
        type: "error",
      });
    }

    setEditingUser(null);
    setIsConfirming(false);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 text-[11px] font-bold">🛡️ Administrador</Badge>;
      case "TEACHER":
        return <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[11px] font-bold">👨‍🏫 Coordinador</Badge>;
      case "MAINTENANCE":
        return <Badge className="bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30 text-[11px] font-bold">🛠️ Mantenimiento</Badge>;
      default:
        return <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 text-[11px] font-bold">🎓 Estudiante</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 font-sans antialiased selection:bg-primary/20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 ${
            toastMessage.type === "success" ? "bg-emerald-600" : "bg-rose-600"
          }`}
        >
          {toastMessage.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Banner de Consola de Administración */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-border/40 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="size-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 text-blue-400 flex items-center justify-center shrink-0 shadow-md">
              <Shield className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Panel de Administración Real
                </h1>
                <Badge variant="outline" className="border-emerald-400/40 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  PostgreSQL DB
                </Badge>
              </div>
              <p className="text-xs text-slate-300">
                Gestión en tiempo real de usuarios y permisos registrados con Google OAuth.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 px-3.5 py-1.5 rounded-2xl backdrop-blur-md border border-white/15">
            <Avatar className="size-8">
              <AvatarImage src={user.image || undefined} alt={user.name || "Admin"} />
              <AvatarFallback className="bg-blue-600 text-white text-xs font-bold">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <p className="font-bold text-white leading-none truncate max-w-[140px]">
                {user.name || "Admin GABO"}
              </p>
              <p className="text-[10px] text-blue-300 font-mono">Superusuario</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* 1. SECCIÓN: Métricas Reales desde PostgreSQL */}
        <section aria-label="Métricas reales de la base de datos" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black tracking-tight text-foreground flex items-center gap-2">
              <BarChart3 className="size-5 text-primary" />
              Métricas Reales (Base de Datos PostgreSQL)
            </h2>
            <Button
              onClick={loadRealData}
              variant="outline"
              size="sm"
              disabled={loading}
              className="h-8 rounded-xl text-xs font-bold gap-1"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Actualizar</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <Card className="rounded-2xl border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <Users className="size-4 text-blue-500" />
                <span className="text-[10px] font-bold text-emerald-500">Real</span>
              </div>
              <p className="text-2xl font-black text-foreground font-mono">{metrics.totalUsers}</p>
              <p className="text-[11px] font-semibold text-muted-foreground">Registrados</p>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <UserCheck className="size-4 text-emerald-500" />
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{metrics.activeUsersToday}</p>
              <p className="text-[11px] font-semibold text-muted-foreground">Activos Hoy</p>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <GraduationCap className="size-4 text-sky-500" />
                <span className="text-[10px] font-mono text-muted-foreground">STUDENT</span>
              </div>
              <p className="text-2xl font-black text-foreground font-mono">{metrics.countStudents}</p>
              <p className="text-[11px] font-semibold text-muted-foreground">Estudiantes</p>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <Users className="size-4 text-amber-500" />
                <span className="text-[10px] font-mono text-muted-foreground">TEACHER</span>
              </div>
              <p className="text-2xl font-black text-foreground font-mono">{metrics.countTeachers}</p>
              <p className="text-[11px] font-semibold text-muted-foreground">Coordinadores</p>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <Wrench className="size-4 text-purple-500" />
                <span className="text-[10px] font-mono text-muted-foreground">MAINTENANCE</span>
              </div>
              <p className="text-2xl font-black text-foreground font-mono">{metrics.countMaintenance}</p>
              <p className="text-[11px] font-semibold text-muted-foreground">Mantenimiento</p>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <Shield className="size-4 text-rose-500" />
                <span className="text-[10px] font-mono text-muted-foreground">ADMIN</span>
              </div>
              <p className="text-2xl font-black text-foreground font-mono">{metrics.countAdmins}</p>
              <p className="text-[11px] font-semibold text-muted-foreground">Admins</p>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <Activity className="size-4 text-indigo-500" />
                <span className="text-[10px] font-bold text-indigo-500">DB</span>
              </div>
              <p className="text-2xl font-black text-foreground font-mono">{metrics.totalReports}</p>
              <p className="text-[11px] font-semibold text-muted-foreground">Reportes Totales</p>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card p-3.5 space-y-1">
              <div className="flex items-center justify-between text-muted-foreground">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-500">
                  {metrics.totalReports > 0 ? `${Math.round((metrics.resolvedReports / metrics.totalReports) * 100)}%` : "0%"}
                </span>
              </div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{metrics.resolvedReports}</p>
              <p className="text-[11px] font-semibold text-muted-foreground">Resueltos</p>
            </Card>
          </div>
        </section>

        {/* 2. SECCIÓN: Último usuario registrado en el colegio */}
        {metrics.latestUserName && (
          <Card className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserPlus className="size-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-foreground">Último usuario registrado en la plataforma:</p>
                <p className="text-sm font-extrabold text-blue-700 dark:text-blue-300">
                  {metrics.latestUserName} <span className="font-mono text-xs text-muted-foreground">({metrics.latestUserEmail})</span>
                </p>
              </div>
            </div>
            <Badge className="bg-blue-600 text-white text-[10px] font-bold">Google OAuth Verified</Badge>
          </Card>
        )}

        {/* 3. SECCIÓN: Gestión de Usuarios Reales (Búsqueda + Filtro + Ordenamiento + Tabla) */}
        <section aria-label="Gestión de usuarios reales" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black tracking-tight text-foreground flex items-center gap-2">
                <Users className="size-5 text-primary" />
                Usuarios Reales Registrados ({filteredUsers.length})
              </h2>
              <p className="text-xs text-muted-foreground">
                Base de datos de Auth.js y PostgreSQL en producción.
              </p>
            </div>

            {/* Controles de Búsqueda, Filtro y Ordenamiento */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar nombre o correo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-10 rounded-2xl text-xs bg-card border-border/80"
                />
              </div>

              {/* Selector Filtro de Rol */}
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="h-10 px-3 rounded-2xl text-xs bg-card border border-border/80 font-bold text-foreground focus:outline-hidden"
              >
                <option value="ALL">Todos los roles</option>
                <option value="STUDENT">Estudiantes</option>
                <option value="TEACHER">Coordinadores</option>
                <option value="MAINTENANCE">Mantenimiento</option>
                <option value="ADMIN">Administradores</option>
              </select>

              {/* Selector de Ordenamiento */}
              <button
                onClick={() => {
                  if (sortBy === "name") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("name");
                    setSortOrder("asc");
                  }
                }}
                className={`h-10 px-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  sortBy === "name" ? "border-primary bg-primary/10 text-primary" : "border-border/80 bg-card text-muted-foreground"
                }`}
              >
                <ArrowUpDown className="size-3.5" />
                <span>Nombre {sortBy === "name" ? (sortOrder === "asc" ? "A-Z" : "Z-A") : ""}</span>
              </button>

              <button
                onClick={() => {
                  if (sortBy === "date") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("date");
                    setSortOrder("desc");
                  }
                }}
                className={`h-10 px-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  sortBy === "date" ? "border-primary bg-primary/10 text-primary" : "border-border/80 bg-card text-muted-foreground"
                }`}
              >
                <Clock className="size-3.5" />
                <span>Fecha {sortBy === "date" ? (sortOrder === "desc" ? "Reciente" : "Antiguo") : ""}</span>
              </button>
            </div>
          </div>

          {/* TABLA RESPONSIVE DE USUARIOS REALES */}
          <Card className="rounded-3xl border-border/80 bg-card overflow-hidden shadow-sm">
            
            {loading ? (
              <div className="p-12 text-center text-xs font-bold text-muted-foreground flex flex-col items-center gap-2">
                <RefreshCw className="size-6 text-primary animate-spin" />
                <span>Cargando usuarios desde PostgreSQL...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-12 text-center text-xs font-semibold text-muted-foreground space-y-2">
                <Users className="size-8 mx-auto text-muted-foreground/50" />
                <p className="text-sm font-bold text-foreground">No se encontraron usuarios reales</p>
                <p>Intenta cambiar los términos de búsqueda o el filtro de rol.</p>
              </div>
            ) : (
              <>
                {/* Vista de Tabla para Escritorio */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3.5 px-4">Usuario (Google OAuth)</th>
                        <th className="py-3.5 px-4">Correo Institucional</th>
                        <th className="py-3.5 px-4">Fecha de Registro</th>
                        <th className="py-3.5 px-4">Rol Actual</th>
                        <th className="py-3.5 px-4">Estado</th>
                        <th className="py-3.5 px-4 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="size-9 ring-1 ring-border shrink-0">
                                <AvatarImage src={u.image} alt={u.name} />
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                  {u.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-extrabold text-foreground text-sm truncate max-w-[180px]">
                                {u.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-muted-foreground">
                            {u.email}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground font-mono">
                            {u.createdAt}
                          </td>
                          <td className="py-3 px-4">
                            {getRoleBadge(u.role)}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                              <span className="size-1.5 rounded-full bg-emerald-500" />
                              Activo
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button
                              onClick={() => handleOpenEditModal(u)}
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 rounded-xl border-primary/30 text-primary hover:bg-primary/10 font-bold text-xs gap-1.5"
                            >
                              <Edit3 className="size-3.5" />
                              <span>Administrar</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Vista de Lista para Dispositivos Móviles */}
                <div className="md:hidden divide-y divide-border/60">
                  {filteredUsers.map((u) => (
                    <div key={u.id} className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10">
                            <AvatarImage src={u.image} alt={u.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {u.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-extrabold text-sm text-foreground truncate">{u.name}</p>
                            <p className="text-xs font-mono text-muted-foreground truncate">{u.email}</p>
                          </div>
                        </div>

                        {getRoleBadge(u.role)}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                        <span className="font-mono text-[11px]">{u.createdAt}</span>
                        <Button
                          onClick={() => handleOpenEditModal(u)}
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 rounded-xl border-primary/30 text-primary font-bold text-xs gap-1"
                        >
                          <Edit3 className="size-3.5" />
                          <span>Administrar</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </Card>
        </section>

        {/* 4. SECCIÓN: Registro de Auditoría Reciente */}
        <section aria-label="Auditoría de actividad" className="space-y-4">
          <h2 className="text-base font-black tracking-tight text-foreground flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            Auditoría de Cambios de Rol
          </h2>

          <Card className="rounded-3xl border-border/80 bg-card p-5 space-y-3 shadow-sm">
            <div className="space-y-3 divide-y divide-border/60">
              {auditLogs.map((log) => (
                <div key={log.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="size-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">{log.action}</p>
                      <p className="text-[11px] text-muted-foreground">Por: <span className="font-semibold text-foreground">{log.actor}</span></p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-muted-foreground shrink-0 bg-muted px-2 py-0.5 rounded-md border border-border/60">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

      </div>

      {/* MODAL "ADMINISTRAR ROL DE USUARIO REAL" */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-foreground flex items-center gap-2">
              <Edit3 className="size-5 text-primary" />
              Administrar Rol de Usuario
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              El cambio se actualizará inmediatamente en la base de datos PostgreSQL de produción.
            </DialogDescription>
          </DialogHeader>

          {editingUser && (
            <div className="space-y-5 py-2">
              {/* Información del usuario real de Google OAuth */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/60 border border-border/60">
                <Avatar className="size-11 ring-2 ring-primary/20">
                  <AvatarImage src={editingUser.image} alt={editingUser.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {editingUser.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold text-sm text-foreground truncate">{editingUser.name}</p>
                  <p className="text-xs font-mono text-muted-foreground truncate">{editingUser.email}</p>
                  <div className="mt-1">{getRoleBadge(editingUser.role)}</div>
                </div>
              </div>

              {/* Selector de Nuevo Rol */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Seleccionar Nuevo Rol Institucional:</label>
                <div className="grid grid-cols-1 gap-2">
                  
                  <button
                    type="button"
                    onClick={() => setNewSelectedRole("STUDENT")}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      newSelectedRole === "STUDENT"
                        ? "border-blue-500 bg-blue-500/10 font-bold"
                        : "border-border/80 bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="size-4 text-blue-500" />
                      <div>
                        <p className="text-xs font-bold text-foreground">Estudiante</p>
                        <p className="text-[10px] text-muted-foreground">Crear y apoyar reportes comunitarios</p>
                      </div>
                    </div>
                    {newSelectedRole === "STUDENT" && <Check className="size-4 text-blue-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewSelectedRole("TEACHER")}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      newSelectedRole === "TEACHER"
                        ? "border-amber-500 bg-amber-500/10 font-bold"
                        : "border-border/80 bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <UserCheck className="size-4 text-amber-500" />
                      <div>
                        <p className="text-xs font-bold text-foreground">Coordinador / Profesor</p>
                        <p className="text-[10px] text-muted-foreground">Revisar, aprobar y asignar a mantenimiento</p>
                      </div>
                    </div>
                    {newSelectedRole === "TEACHER" && <Check className="size-4 text-amber-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewSelectedRole("MAINTENANCE")}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      newSelectedRole === "MAINTENANCE"
                        ? "border-purple-500 bg-purple-500/10 font-bold"
                        : "border-border/80 bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Wrench className="size-4 text-purple-500" />
                      <div>
                        <p className="text-xs font-bold text-foreground">Personal de Mantenimiento</p>
                        <p className="text-[10px] text-muted-foreground">Atender cuadrillas, subir evidencia y resolver</p>
                      </div>
                    </div>
                    {newSelectedRole === "MAINTENANCE" && <Check className="size-4 text-purple-500" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewSelectedRole("ADMIN")}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      newSelectedRole === "ADMIN"
                        ? "border-rose-500 bg-rose-500/10 font-bold"
                        : "border-border/80 bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Shield className="size-4 text-rose-500" />
                      <div>
                        <p className="text-xs font-bold text-foreground">Administrador del Sistema</p>
                        <p className="text-[10px] text-muted-foreground">Acceso total a la consola de usuarios y auditoría</p>
                      </div>
                    </div>
                    {newSelectedRole === "ADMIN" && <Check className="size-4 text-rose-500" />}
                  </button>

                </div>
              </div>

              {/* Confirmación adicional */}
              {isConfirming && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs space-y-1">
                  <p className="font-bold flex items-center gap-1">
                    <AlertTriangle className="size-4 text-amber-500" />
                    ¿Confirmar actualización de permisos?
                  </p>
                  <p className="text-[11px]">
                    El usuario iniciará sesión con el rol <strong>{newSelectedRole}</strong> en su próximo acceso.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingUser(null);
                setIsConfirming(false);
              }}
              className="rounded-2xl border-border text-xs h-10"
            >
              Cancelar
            </Button>

            {!isConfirming ? (
              <Button
                type="button"
                onClick={() => setIsConfirming(true)}
                className="rounded-2xl bg-primary text-white font-bold text-xs h-10"
              >
                Guardar Cambios
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleConfirmSaveRole}
                className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10"
              >
                Confirmar y Persistir en DB
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Navegación Móvil Inferior */}
      <BottomNavigation />
    </div>
  );
};
