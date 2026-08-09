import { useState, useRef } from 'react';
import { Camera, KeyRound, User } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AppShell } from '../../../components/layout/AppShell';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';
import { useAuth } from '../../auth/hooks/useAuth';
import { useAuthStore } from '../../auth/store/authStore';
import { usersApi } from '../api/usersApi';
import { getAvatarUrl, getInitials, formatDate } from '../../../lib/utils';

export function ProfilePage() {
  const { user } = useAuth();
  const { setUser } = useAuthStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const [pwForm, setPwForm] = useState({ oldPassword: '', newPassword: '' });

  const { mutate: changeAvatar, isPending: uploadingAvatar } = useMutation({
    mutationFn: usersApi.changeAvatar,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      toast.success('Cập nhật ảnh đại diện thành công!');
    },
    onError: () => toast.error('Upload thất bại!'),
  });

  const { mutate: changePassword, isPending: changingPw } = useMutation({
    mutationFn: usersApi.changePassword,
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công!');
      setPwForm({ oldPassword: '', newPassword: '' });
    },
    onError: () => toast.error('Mật khẩu cũ không đúng!'),
  });

  const avatarUrl = getAvatarUrl(user?.avatar_url);

  return (
    <AppShell title="Hồ sơ cá nhân">
      <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">

        {/* Profile card */}
        <div className="clay-card p-6">
          <div className="flex items-center gap-6 mb-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl border-3 border-[var(--color-border-strong)] overflow-hidden bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center"
                style={{ borderWidth: '3px' }}>
                {avatarUrl
                  ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  : <span className="text-2xl font-extrabold text-white">{getInitials(user?.full_name)}</span>
                }
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-[var(--color-primary)] border-2 border-[var(--color-primary-dark)] flex items-center justify-center cursor-pointer hover:bg-[var(--color-primary-light)] transition-colors"
                aria-label="Đổi ảnh đại diện"
              >
                <Camera size={14} className="text-white" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) changeAvatar(f);
                }}
                aria-label="Chọn ảnh"
              />
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--color-foreground)]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {user?.full_name}
              </h2>
              <p className="text-sm text-[var(--color-muted)">@{user?.username}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={user?.role === 'admin' ? 'purple' : user?.role === 'teacher' ? 'warning' : 'primary'} dot>
                  {user?.role === 'admin' ? 'Quản trị viên' : user?.role === 'teacher' ? 'Giáo viên' : 'Học sinh'}
                </Badge>
                <span className="text-xs text-[var(--color-muted)]">Ngày tham gia: {formatDate(user?.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Info fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--color-muted-bg)] border-2 border-[var(--color-border)]">
              <User size={16} className="text-[var(--color-muted)] shrink-0" />
              <div>
                <p className="text-xs text-[var(--color-muted)] font-semibold">Họ và tên</p>
                <p className="text-sm font-bold text-[var(--color-foreground)]">{user?.full_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--color-muted-bg)] border-2 border-[var(--color-border)]">
              <User size={16} className="text-[var(--color-muted)] shrink-0" />
              <div>
                <p className="text-xs text-[var(--color-muted)] font-semibold">Email</p>
                <p className="text-sm font-bold text-[var(--color-foreground)]">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="clay-card clay-orange p-6">
          <div className="flex items-center gap-2 mb-4">
            <KeyRound size={20} className="text-orange-600" />
            <h3 className="font-extrabold text-lg text-[var(--color-foreground)]"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Đổi mật khẩu
            </h3>
          </div>
          <div className="space-y-4">
            <Input
              id="old-password"
              label="Mật khẩu hiện tại"
              type="password"
              value={pwForm.oldPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, oldPassword: e.target.value }))}
              placeholder="Nhập mật khẩu hiện tại..."
            />
            <Input
              id="new-password"
              label="Mật khẩu mới"
              type="password"
              value={pwForm.newPassword}
              onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))}
              placeholder="Mật khẩu mới (tối thiểu 8 ký tự)..."
            />
            <Button
              variant="warning"
              isLoading={changingPw}
              disabled={!pwForm.oldPassword || !pwForm.newPassword}
              onClick={() => changePassword(pwForm)}
              leftIcon={<KeyRound size={16} />}
            >
              Đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
