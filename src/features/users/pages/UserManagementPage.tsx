import { useState } from 'react';
import {
  Users, Search, ShieldCheck, GraduationCap, UserCheck,
  RefreshCw, Trash2, UserCog, AlertTriangle
} from 'lucide-react';
import { AppShell } from '../../../components/layout/AppShell';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { useUsersList, useChangeUserRole, useDeleteUser } from '../hooks/useUsers';
import { useAuth } from '../../auth/hooks/useAuth';
import type { User, UserRole } from '../../../types/models';
import { getAvatarUrl, getInitials, formatDate } from '../../../lib/utils';
import { cn } from '../../../lib/utils';

export function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const { data: users = [], isLoading, refetch, isRefetching } = useUsersList();
  const { mutate: changeRole, isPending: changingRole } = useChangeUserRole();
  const { mutate: deleteUser, isPending: deletingUser } = useDeleteUser();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  
  // Modals state
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Counts
  const totalCount = users.length;
  const studentsCount = users.filter((u) => u.role === 'student').length;
  const teachersCount = users.filter((u) => u.role === 'teacher').length;
  const adminsCount = users.filter((u) => u.role === 'admin').length;

  // Filtered users list
  const filteredUsers = users
    .filter((u) => (roleFilter === 'all' ? true : u.role === roleFilter))
    .filter((u) => {
      const q = search.toLowerCase();
      return (
        u.full_name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    });

  const handleOpenRoleModal = (u: User) => {
    setTargetUser(u);
    setSelectedRole(u.role);
    setShowRoleModal(true);
  };

  const handleConfirmRoleChange = () => {
    if (!targetUser) return;
    changeRole(
      { id: targetUser.id, newRole: selectedRole },
      {
        onSuccess: () => {
          setShowRoleModal(false);
          setTargetUser(null);
        },
      }
    );
  };

  const handleOpenDeleteModal = (u: User) => {
    setTargetUser(u);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!targetUser) return;
    deleteUser(targetUser.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setTargetUser(null);
      },
    });
  };

  return (
    <AppShell title="Quản lý Người dùng">
      <div className="space-y-6 animate-slide-up">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-black text-[var(--color-foreground)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Quản lý danh sách tài khoản
            </h1>
            <p className="text-sm text-[var(--color-muted)]">
              Quản lý phân quyền, thay đổi vai trò (Học sinh, Giáo viên, Admin) và tài khoản hệ thống.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCw size={14} className={isRefetching ? 'animate-spin' : ''} />}
              onClick={() => refetch()}
            >
              Làm mới
            </Button>
          </div>
        </div>

        {/* 4 Stat Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total */}
          <div className="clay-card p-4 bg-white border-3 border-[var(--color-border-strong)] rounded-2xl shadow-[4px_4px_0px_var(--color-border-strong)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-[var(--color-muted)]">Tổng tài khoản</span>
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Users size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-[var(--color-foreground)]">{totalCount}</p>
          </div>

          {/* Students */}
          <div className="clay-card p-4 bg-white border-3 border-teal-300 rounded-2xl shadow-[4px_4px_0px_#0d9488]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-teal-700">Học sinh</span>
              <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                <GraduationCap size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-teal-900">{studentsCount}</p>
          </div>

          {/* Teachers */}
          <div className="clay-card p-4 bg-white border-3 border-blue-300 rounded-2xl shadow-[4px_4px_0px_#2563eb]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-blue-700">Giáo viên</span>
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                <UserCheck size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-blue-900">{teachersCount}</p>
          </div>

          {/* Admins */}
          <div className="clay-card p-4 bg-white border-3 border-purple-300 rounded-2xl shadow-[4px_4px_0px_#9333ea]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-purple-700">Admin</span>
              <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                <ShieldCheck size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-purple-900">{adminsCount}</p>
          </div>
        </div>

        {/* Toolbar: Search & Role Filter */}
        <div className="clay-card p-4 bg-[var(--color-surface)] border-3 border-[var(--color-border-strong)] rounded-2xl shadow-[4px_4px_0px_var(--color-border-strong)] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <Input
              id="user-search"
              placeholder="Tìm theo họ tên, username, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 text-xs font-extrabold overflow-x-auto">
            <button
              onClick={() => setRoleFilter('all')}
              className={cn(
                'px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap',
                roleFilter === 'all'
                  ? 'bg-white text-[var(--color-foreground)] shadow-xs font-black'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              Tất cả ({totalCount})
            </button>

            <button
              onClick={() => setRoleFilter('student')}
              className={cn(
                'px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap',
                roleFilter === 'student'
                  ? 'bg-teal-500 text-white shadow-xs font-black'
                  : 'text-slate-500 hover:text-teal-700'
              )}
            >
              Học sinh ({studentsCount})
            </button>

            <button
              onClick={() => setRoleFilter('teacher')}
              className={cn(
                'px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap',
                roleFilter === 'teacher'
                  ? 'bg-blue-500 text-white shadow-xs font-black'
                  : 'text-slate-500 hover:text-blue-700'
              )}
            >
              Giáo viên ({teachersCount})
            </button>

            <button
              onClick={() => setRoleFilter('admin')}
              className={cn(
                'px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap',
                roleFilter === 'admin'
                  ? 'bg-purple-600 text-white shadow-xs font-black'
                  : 'text-slate-500 hover:text-purple-700'
              )}
            >
              Admin ({adminsCount})
            </button>
          </div>
        </div>

        {/* User Table / List */}
        {isLoading ? (
          <LoadingSpinner size="lg" label="Đang tải danh sách người dùng..." className="py-20" />
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            emoji="👥"
            title="Không tìm thấy người dùng"
            description={search ? `Không có kết quả khớp với "${search}"` : 'Chưa có tài khoản nào thuộc danh mục này.'}
          />
        ) : (
          <div className="clay-card bg-[var(--color-surface)] border-3 border-[var(--color-border-strong)] rounded-2xl shadow-[4px_4px_0px_var(--color-border-strong)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b-2 border-[var(--color-border)] text-xs font-black uppercase text-slate-600">
                    <th className="p-4">Người dùng</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Ngày tạo</th>
                    <th className="p-4">Vai trò</th>
                    <th className="p-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => {
                    const avatarUrl = getAvatarUrl(u.avatar_url);
                    const isSelf = currentUser?.id === u.id;

                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* User info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 to-purple-500 border-2 border-teal-600 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                              {avatarUrl ? (
                                <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs font-extrabold text-white">
                                  {getInitials(u.full_name)}
                                </span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-extrabold text-[var(--color-foreground)] truncate flex items-center gap-1.5">
                                {u.full_name}
                                {isSelf && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-black border border-amber-300">
                                    Bạn
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-[var(--color-muted)] truncate">@{u.username}</p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="p-4 font-semibold text-slate-700">{u.email}</td>

                        {/* Date created */}
                        <td className="p-4 text-xs font-medium text-slate-500">
                          {formatDate(u.created_at || (u as any).create_at)}
                        </td>

                        {/* Role badge */}
                        <td className="p-4">
                          <Badge
                            variant={u.role === 'admin' ? 'purple' : u.role === 'teacher' ? 'warning' : 'primary'}
                            dot
                          >
                            {u.role === 'admin' ? '⚡ Quản trị viên' : u.role === 'teacher' ? '👨‍🏫 Giáo viên' : '🎓 Học sinh'}
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              leftIcon={<UserCog size={14} />}
                              onClick={() => handleOpenRoleModal(u)}
                            >
                              Đổi vai trò
                            </Button>

                            <Button
                              variant="danger"
                              size="sm"
                              disabled={isSelf}
                              onClick={() => handleOpenDeleteModal(u)}
                              title={isSelf ? 'Không thể xoá chính bạn' : 'Xoá người dùng'}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ================= ROLE CHANGE MODAL ================= */}
      <Modal
        isOpen={showRoleModal}
        onClose={() => {
          setShowRoleModal(false);
          setTargetUser(null);
        }}
        title="⚡ Phân quyền & Thay đổi Vai trò"
        size="sm"
      >
        {targetUser && (
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-white font-extrabold flex items-center justify-center">
                {getInitials(targetUser.full_name)}
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-sm text-[var(--color-foreground)]">{targetUser.full_name}</p>
                <p className="text-xs text-[var(--color-muted)]">@{targetUser.username} • {targetUser.email}</p>
              </div>
            </div>

            {targetUser.id === currentUser?.id && (
              <div className="p-3 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs font-bold text-amber-800 flex items-center gap-2">
                <AlertTriangle size={16} className="shrink-0 text-amber-600" />
                <span>Lưu ý: Thay đổi vai trò của chính bạn sẽ làm ảnh hưởng tới quyền truy cập hiện tại!</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-600 block">Chọn vai trò mới:</label>
              
              <div className="space-y-2">
                {/* Student Option */}
                <label
                  onClick={() => setSelectedRole('student')}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all',
                    selectedRole === 'student'
                      ? 'bg-teal-50 border-teal-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  )}
                >
                  <input
                    type="radio"
                    name="roleOption"
                    checked={selectedRole === 'student'}
                    onChange={() => setSelectedRole('student')}
                    className="accent-teal-600"
                  />
                  <div>
                    <p className="text-sm font-extrabold text-teal-900">🎓 Học sinh (Student)</p>
                    <p className="text-xs text-slate-500">Chỉ tham gia làm bài thi và xem lịch sử kết quả thi.</p>
                  </div>
                </label>

                {/* Teacher Option */}
                <label
                  onClick={() => setSelectedRole('teacher')}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all',
                    selectedRole === 'teacher'
                      ? 'bg-blue-50 border-blue-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  )}
                >
                  <input
                    type="radio"
                    name="roleOption"
                    checked={selectedRole === 'teacher'}
                    onChange={() => setSelectedRole('teacher')}
                    className="accent-blue-600"
                  />
                  <div>
                    <p className="text-sm font-extrabold text-blue-900">👨‍🏫 Giáo viên (Teacher)</p>
                    <p className="text-xs text-slate-500">Quyền tạo/sửa môn học, quản lý đề thi, tạo đề bằng AI và xem thống kê.</p>
                  </div>
                </label>

                {/* Admin Option */}
                <label
                  onClick={() => setSelectedRole('admin')}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all',
                    selectedRole === 'admin'
                      ? 'bg-purple-50 border-purple-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  )}
                >
                  <input
                    type="radio"
                    name="roleOption"
                    checked={selectedRole === 'admin'}
                    onChange={() => setSelectedRole('admin')}
                    className="accent-purple-600"
                  />
                  <div>
                    <p className="text-sm font-extrabold text-purple-900">⚡ Quản trị viên (Admin)</p>
                    <p className="text-xs text-slate-500">Toàn quyền hệ thống, quản lý tất cả tài khoản và dữ liệu.</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="ghost" onClick={() => setShowRoleModal(false)}>
                Hủy
              </Button>
              <Button
                variant="primary"
                isLoading={changingRole}
                onClick={handleConfirmRoleChange}
              >
                Lưu vai trò
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ================= DELETE USER MODAL ================= */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setTargetUser(null);
        }}
        title="⚠️ Xác nhận xoá tài khoản"
        size="sm"
      >
        {targetUser && (
          <div className="space-y-4">
            <p className="text-sm text-slate-700">
              Bạn có chắc chắn muốn xoá vĩnh viễn tài khoản <strong className="text-red-600">{targetUser.full_name}</strong> (@{targetUser.username}) không?
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              Hành động này không thể hoàn tác và dữ liệu liên quan sẽ bị xoá khỏi hệ thống.
            </p>

            <div className="flex gap-3 justify-end pt-2">
              <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
                Hủy
              </Button>
              <Button
                variant="danger"
                isLoading={deletingUser}
                onClick={handleConfirmDelete}
                leftIcon={<Trash2 size={16} />}
              >
                Xóa người dùng
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}
