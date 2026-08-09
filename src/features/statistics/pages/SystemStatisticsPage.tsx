import { useQuery } from '@tanstack/react-query';
import {
  Server, Users, Key, Sparkles, Database,
  ShieldCheck, Cpu, UserCheck, Layers, AlertCircle
} from 'lucide-react';
import { AppShell } from '../../../components/layout/AppShell';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { statisticsApi } from '../api/statisticsApi';

export function SystemStatisticsPage() {
  const { data: sysStats, isLoading } = useQuery({
    queryKey: ['statistics', 'system-overview'],
    queryFn: statisticsApi.getSystemStatistics,
  });

  return (
    <AppShell title="Thống kê Hệ thống & Kỹ thuật">
      <div className="space-y-8 animate-slide-up pb-10">
        {/* Header Hero */}
        <div className="clay-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white border-3 border-teal-400">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[var(--color-foreground)] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}>
              <Server className="text-purple-600" size={24} />
              Quản trị Kỹ thuật & Tài nguyên Hệ thống
            </h2>
            <p className="text-xs text-[var(--color-muted)] font-medium">
              Thống kê tài khoản người dùng, phiên đăng nhập, lượng AI Token tiêu thụ và cơ sở dữ liệu hệ thống (Chỉ dành cho Admin).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-purple-100 text-purple-900 px-4 py-2 rounded-2xl border-2 border-purple-400 text-xs font-extrabold shadow-xs shrink-0">
            <ShieldCheck size={18} className="text-purple-700" />
            <span>Khu vực Quản trị Admin</span>
          </div>
        </div>

        {isLoading || !sysStats ? (
          <LoadingSpinner size="lg" label="Đang kiểm tra chỉ số hệ thống..." className="py-20" />
        ) : (
          <>
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Users */}
              <div className="rounded-3xl p-5 border-3 transition-all hover:-translate-y-1"
                style={{ background: '#EFF6FF', border: '3px solid #3B82F6', boxShadow: '4px 4px 0px #2563EB' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl border-2" style={{ background: '#3B82F620', borderColor: '#3B82F6', color: '#1E40AF' }}>
                    <Users size={22} />
                  </div>
                  <span className="text-xs font-extrabold text-blue-800 bg-white px-2.5 py-0.5 rounded-full border border-blue-300">Tài khoản</span>
                </div>
                <p className="text-3xl font-extrabold text-blue-950 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {sysStats.users_breakdown.total}
                </p>
                <p className="text-xs font-bold text-blue-800">
                  {sysStats.users_breakdown.students} Học sinh · {sysStats.users_breakdown.teachers} GV
                </p>
              </div>

              {/* Active Tokens */}
              <div className="rounded-3xl p-5 border-3 transition-all hover:-translate-y-1"
                style={{ background: '#F0FDFA', border: '3px solid #14B8A6', boxShadow: '4px 4px 0px #0D9488' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl border-2" style={{ background: '#14B8A620', borderColor: '#14B8A6', color: '#0F766E' }}>
                    <Key size={22} />
                  </div>
                  <span className="text-xs font-extrabold text-teal-800 bg-white px-2.5 py-0.5 rounded-full border border-teal-300">Session Tokens</span>
                </div>
                <p className="text-3xl font-extrabold text-teal-950 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {sysStats.auth_tokens.active_tokens} <span className="text-xs font-bold text-teal-700">/ {sysStats.auth_tokens.total_refresh_tokens}</span>
                </p>
                <p className="text-xs font-bold text-teal-800">Tokens đang hoạt động</p>
              </div>

              {/* AI Tokens */}
              <div className="rounded-3xl p-5 border-3 transition-all hover:-translate-y-1"
                style={{ background: '#FAF5FF', border: '3px solid #A855F7', boxShadow: '4px 4px 0px #9333EA' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl border-2" style={{ background: '#A855F720', borderColor: '#A855F7', color: '#7C3AED' }}>
                    <Sparkles size={22} />
                  </div>
                  <span className="text-xs font-extrabold text-purple-800 bg-white px-2.5 py-0.5 rounded-full border border-purple-300">AI Tokens</span>
                </div>
                <p className="text-3xl font-extrabold text-purple-950 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {(sysStats.ai_stats.estimated_total_tokens / 1000).toFixed(1)}k
                </p>
                <p className="text-xs font-bold text-purple-800">Tokens tiêu thụ ước tính</p>
              </div>

              {/* Vector RAG */}
              <div className="rounded-3xl p-5 border-3 transition-all hover:-translate-y-1"
                style={{ background: '#FFF7ED', border: '3px solid #F97316', boxShadow: '4px 4px 0px #EA6C00' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl border-2" style={{ background: '#F9731620', borderColor: '#F97316', color: '#C2570A' }}>
                    <Cpu size={22} />
                  </div>
                  <span className="text-xs font-extrabold text-orange-800 bg-white px-2.5 py-0.5 rounded-full border border-orange-300">Vector Store</span>
                </div>
                <p className="text-3xl font-extrabold text-orange-950 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {sysStats.ai_stats.vector_points_count.toLocaleString()}
                </p>
                <p className="text-xs font-bold text-orange-800">Vector Chunks (Qdrant RAG)</p>
              </div>
            </div>

            {/* Grid 2 Columns: Users Breakdown & Security Auth Tokens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Users Breakdown */}
              <div className="clay-card p-6 space-y-5 bg-white border-3 border-teal-300">
                <div className="flex items-center justify-between border-b-2 border-[var(--color-border)] pb-3">
                  <h3 className="text-lg font-extrabold text-[var(--color-foreground)] flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    <UserCheck className="text-blue-600" size={20} />
                    Phân bổ Tài khoản Người dùng ({sysStats.users_breakdown.total})
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-100/90 p-4 rounded-2xl border-3 border-blue-300 text-center shadow-[3px_3px_0px_#2563eb]">
                    <span className="text-xs font-extrabold text-blue-900 block mb-1">🎓 Học sinh</span>
                    <span className="text-3xl font-extrabold text-blue-950" style={{ fontFamily: 'var(--font-heading)' }}>
                      {sysStats.users_breakdown.students}
                    </span>
                  </div>

                  <div className="bg-teal-100/90 p-4 rounded-2xl border-3 border-teal-300 text-center shadow-[3px_3px_0px_#0d9488]">
                    <span className="text-xs font-extrabold text-teal-900 block mb-1">👨‍🏫 Giáo viên</span>
                    <span className="text-3xl font-extrabold text-teal-950" style={{ fontFamily: 'var(--font-heading)' }}>
                      {sysStats.users_breakdown.teachers}
                    </span>
                  </div>

                  <div className="bg-purple-100/90 p-4 rounded-2xl border-3 border-purple-300 text-center shadow-[3px_3px_0px_#9333ea]">
                    <span className="text-xs font-extrabold text-purple-900 block mb-1">⚡ Admin</span>
                    <span className="text-3xl font-extrabold text-purple-950" style={{ fontFamily: 'var(--font-heading)' }}>
                      {sysStats.users_breakdown.admins}
                    </span>
                  </div>
                </div>

                {/* Progress bar of roles */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-extrabold text-[var(--color-foreground)]">
                    <span>Tỉ lệ vai trò</span>
                    <span>
                      {Math.round((sysStats.users_breakdown.students / Math.max(1, sysStats.users_breakdown.total)) * 100)}% Học sinh
                    </span>
                  </div>
                  <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex border-2 border-slate-300 shadow-inner">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: `${(sysStats.users_breakdown.students / Math.max(1, sysStats.users_breakdown.total)) * 100}%` }}
                    />
                    <div
                      className="bg-teal-500 h-full"
                      style={{ width: `${(sysStats.users_breakdown.teachers / Math.max(1, sysStats.users_breakdown.total)) * 100}%` }}
                    />
                    <div
                      className="bg-purple-500 h-full"
                      style={{ width: `${(sysStats.users_breakdown.admins / Math.max(1, sysStats.users_breakdown.total)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[var(--color-foreground)] pt-2 border-t-2 border-[var(--color-border)]">
                  <span>🆕 Đăng ký mới (7 ngày qua): <strong className="text-teal-700 font-extrabold text-sm">{sysStats.users_breakdown.new_7days}</strong></span>
                  <span>🆕 Đăng ký mới (30 ngày qua): <strong className="text-teal-700 font-extrabold text-sm">{sysStats.users_breakdown.new_30days}</strong></span>
                </div>
              </div>

              {/* Security & Auth Tokens */}
              <div className="clay-card p-6 space-y-5 bg-white border-3 border-teal-300">
                <div className="flex items-center justify-between border-b-2 border-[var(--color-border)] pb-3">
                  <h3 className="text-lg font-extrabold text-[var(--color-foreground)] flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    <Key className="text-teal-600" size={20} />
                    Quản lý Session & Refresh Tokens
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-emerald-100/90 p-4 rounded-2xl border-3 border-emerald-300 text-center shadow-[3px_3px_0px_#15803d]">
                    <span className="text-xs font-extrabold text-emerald-900 block mb-1">✅ Hoạt động</span>
                    <span className="text-3xl font-extrabold text-emerald-950" style={{ fontFamily: 'var(--font-heading)' }}>
                      {sysStats.auth_tokens.active_tokens}
                    </span>
                  </div>

                  <div className="bg-amber-100/90 p-4 rounded-2xl border-3 border-amber-300 text-center shadow-[3px_3px_0px_#b45309]">
                    <span className="text-xs font-extrabold text-amber-900 block mb-1">⏳ Hết hạn</span>
                    <span className="text-3xl font-extrabold text-amber-950" style={{ fontFamily: 'var(--font-heading)' }}>
                      {sysStats.auth_tokens.expired_tokens}
                    </span>
                  </div>

                  <div className="bg-red-100/90 p-4 rounded-2xl border-3 border-red-300 text-center shadow-[3px_3px_0px_#b91c1c]">
                    <span className="text-xs font-extrabold text-red-900 block mb-1">🚫 Thu hồi</span>
                    <span className="text-3xl font-extrabold text-red-950" style={{ fontFamily: 'var(--font-heading)' }}>
                      {sysStats.auth_tokens.revoked_tokens}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-extrabold text-emerald-950">
                    <AlertCircle size={16} className="text-emerald-700 shrink-0" />
                    Trạng thái Bảo mật Token Authentication
                  </div>
                  <p className="text-emerald-900 font-semibold leading-relaxed">
                    Hệ thống tự động xoay chuyển Refresh Token (Token Rotation) và thu hồi token khi người dùng đăng xuất hoặc hết hạn sau 7 ngày.
                  </p>
                </div>
              </div>
            </div>

            {/* Grid 2 Columns: AI Engine & Data Volumes Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Engine & Token Usage */}
              <div className="clay-card p-6 space-y-5 bg-white border-3 border-teal-300">
                <div className="flex items-center justify-between border-b-2 border-[var(--color-border)] pb-3">
                  <h3 className="text-lg font-extrabold text-[var(--color-foreground)] flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    <Sparkles className="text-purple-600" size={20} />
                    Thống kê Sử dụng AI Engine & Tokens
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-100/90 border-2 border-purple-300">
                    <span className="font-bold text-purple-950">🤖 Đề thi tạo từ AI:</span>
                    <span className="font-extrabold text-purple-900 text-sm">{sysStats.ai_stats.ai_exams_count} đề thi</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/90 border-2 border-slate-300">
                    <span className="font-bold text-slate-900">📥 Prompt Tokens (Input):</span>
                    <span className="font-extrabold text-purple-800 text-sm">{sysStats.ai_stats.estimated_prompt_tokens.toLocaleString()} tokens</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/90 border-2 border-slate-300">
                    <span className="font-bold text-slate-900">📤 Completion Tokens (Output):</span>
                    <span className="font-extrabold text-purple-800 text-sm">{sysStats.ai_stats.estimated_completion_tokens.toLocaleString()} tokens</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-100/90 border-2 border-orange-300">
                    <span className="font-bold text-orange-950">⚡ Qdrant Vector Store Chunks:</span>
                    <span className="font-extrabold text-orange-900 text-sm">{sysStats.ai_stats.vector_points_count.toLocaleString()} chunks ({sysStats.ai_stats.vector_status})</span>
                  </div>
                </div>
              </div>

              {/* Data Volumes Summary Table */}
              <div className="clay-card p-6 space-y-5 bg-white border-3 border-teal-300">
                <div className="flex items-center justify-between border-b-2 border-[var(--color-border)] pb-3">
                  <h3 className="text-lg font-extrabold text-[var(--color-foreground)] flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    <Database className="text-blue-600" size={20} />
                    Quy mô Dữ liệu Hệ thống
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b-2 border-slate-300 bg-slate-100 text-slate-900 font-extrabold">
                        <th className="p-3">Thành phần Dữ liệu</th>
                        <th className="p-3 text-right">Số bản ghi</th>
                        <th className="p-3 text-right">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-bold text-slate-800">
                      <tr className="hover:bg-teal-50/50">
                        <td className="p-3 font-bold flex items-center gap-1.5 text-slate-900">
                          <Layers size={15} className="text-teal-600" /> Môn học (Subjects)
                        </td>
                        <td className="p-3 text-right font-extrabold text-teal-700 text-sm">{sysStats.data_volumes.total_subjects}</td>
                        <td className="p-3 text-right text-slate-600 font-semibold">Danh mục môn</td>
                      </tr>
                      <tr className="hover:bg-purple-50/50">
                        <td className="p-3 font-bold flex items-center gap-1.5 text-slate-900">
                          <Layers size={15} className="text-purple-600" /> Đề thi (Exams)
                        </td>
                        <td className="p-3 text-right font-extrabold text-purple-700 text-sm">{sysStats.data_volumes.total_exams}</td>
                        <td className="p-3 text-right text-slate-600 font-semibold">
                          {sysStats.data_volumes.published_exams} Xuất bản / {sysStats.data_volumes.draft_exams} Nháp
                        </td>
                      </tr>
                      <tr className="hover:bg-blue-50/50">
                        <td className="p-3 font-bold flex items-center gap-1.5 text-slate-900">
                          <Layers size={15} className="text-blue-600" /> Câu hỏi (Questions)
                        </td>
                        <td className="p-3 text-right font-extrabold text-blue-700 text-sm">{sysStats.data_volumes.total_questions}</td>
                        <td className="p-3 text-right text-slate-600 font-semibold">{sysStats.data_volumes.total_answers} phương án chọn</td>
                      </tr>
                      <tr className="hover:bg-orange-50/50">
                        <td className="p-3 font-bold flex items-center gap-1.5 text-slate-900">
                          <Layers size={15} className="text-orange-600" /> Lượt nộp bài (Exam Attempts)
                        </td>
                        <td className="p-3 text-right font-extrabold text-orange-700 text-sm">{sysStats.data_volumes.total_attempts}</td>
                        <td className="p-3 text-right text-slate-600 font-semibold">{sysStats.data_volumes.total_user_answers} câu trả lời lưu trữ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
