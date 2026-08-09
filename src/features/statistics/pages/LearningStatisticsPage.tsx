import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart3, Clock, Trophy, Target,
  Search, BookOpen, Award, CheckCircle2, TrendingUp
} from 'lucide-react';
import { AppShell } from '../../../components/layout/AppShell';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { Select } from '../../../components/ui/Select';
import { Input } from '../../../components/ui/Input';
import { statisticsApi } from '../api/statisticsApi';
import { useSubjects } from '../../subjects/hooks/useSubjects';
import { formatDuration } from '../../../lib/utils';

export function LearningStatisticsPage() {
  const [subjectId, setSubjectId] = useState<string>('');
  const [timeframe, setTimeframe] = useState<'7days' | '30days' | 'all'>('all');
  const [searchExam, setSearchExam] = useState<string>('');
  const [timeTab, setTimeTab] = useState<'daily' | 'monthly'>('daily');

  const { data: subjects = [] } = useSubjects();

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['statistics', 'learning-analytics', subjectId, timeframe],
    queryFn: () => statisticsApi.getLearningAnalytics({ subjectId: subjectId || undefined, timeframe }),
  });

  const filteredExams = (analytics?.exam_stats || []).filter((ex) =>
    ex.exam_title.toLowerCase().includes(searchExam.toLowerCase()) ||
    ex.subject_name.toLowerCase().includes(searchExam.toLowerCase())
  );

  return (
    <AppShell title="Thống kê & Phân tích Học tập">
      <div className="space-y-8 animate-slide-up pb-10">
        {/* Header & Filter Controls */}
        <div className="clay-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[var(--color-foreground)] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-heading)' }}>
              <BarChart3 className="text-teal-500" size={24} />
              Báo cáo hiệu suất & Xu hướng làm bài
            </h2>
            <p className="text-xs text-[var(--color-muted)]">
              Phân tích chỉ số chi tiết về kết quả điểm số, thời gian làm bài của học sinh theo từng môn học và đề thi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Subject Filter */}
            <div className="w-full sm:w-48">
              <Select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                options={[
                  { value: '', label: '⚡ Tất cả môn học' },
                  ...subjects.map((s) => ({ value: s.id, label: s.name })),
                ]}
              />
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center bg-[var(--color-muted-bg)] p-1 rounded-2xl border-2 border-[var(--color-border-strong)] shadow-xs">
              {[
                { key: 'all', label: 'Tất cả' },
                { key: '30days', label: '30 ngày' },
                { key: '7days', label: '7 ngày' },
              ].map((tf) => (
                <button
                  key={tf.key}
                  onClick={() => setTimeframe(tf.key as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    timeframe === tf.key
                      ? 'bg-[var(--color-primary)] text-white shadow-xs'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading || !analytics ? (
          <LoadingSpinner size="lg" label="Đang tổng hợp dữ liệu thống kê..." className="py-20" />
        ) : (
          <>
            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Avg Score */}
              <div className="rounded-3xl p-5 border-3 transition-all hover:-translate-y-1"
                style={{ background: '#EFF6FF', border: '3px solid #3B82F6', boxShadow: '4px 4px 0px #2563EB' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl border-2" style={{ background: '#3B82F620', borderColor: '#3B82F6', color: '#1E40AF' }}>
                    <Target size={22} />
                  </div>
                  <span className="text-xs font-bold text-[var(--color-muted)] bg-white px-2 py-0.5 rounded-full border border-blue-200">Điểm TB</span>
                </div>
                <p className="text-3xl font-extrabold text-blue-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {analytics.summary.overall_avg_score} <span className="text-sm font-semibold text-blue-600">/ 100</span>
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden mt-2 border border-blue-300">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, analytics.summary.overall_avg_score)}%` }} />
                </div>
              </div>

              {/* Avg Time */}
              <div className="rounded-3xl p-5 border-3 transition-all hover:-translate-y-1"
                style={{ background: '#FFF7ED', border: '3px solid #F97316', boxShadow: '4px 4px 0px #EA6C00' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl border-2" style={{ background: '#F9731620', borderColor: '#F97316', color: '#C2570A' }}>
                    <Clock size={22} />
                  </div>
                  <span className="text-xs font-bold text-[var(--color-muted)] bg-white px-2 py-0.5 rounded-full border border-orange-200">Thời gian TB</span>
                </div>
                <p className="text-3xl font-extrabold text-orange-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {formatDuration(analytics.summary.overall_avg_time_seconds)}
                </p>
                <p className="text-xs font-semibold text-orange-700">Trung bình 1 lượt làm bài</p>
              </div>

              {/* Pass Rate */}
              <div className="rounded-3xl p-5 border-3 transition-all hover:-translate-y-1"
                style={{ background: '#F0FDFA', border: '3px solid #14B8A6', boxShadow: '4px 4px 0px #0D9488' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl border-2" style={{ background: '#14B8A620', borderColor: '#14B8A6', color: '#0F766E' }}>
                    <CheckCircle2 size={22} />
                  </div>
                  <span className="text-xs font-bold text-[var(--color-muted)] bg-white px-2 py-0.5 rounded-full border border-teal-200">Tỉ lệ đạt</span>
                </div>
                <p className="text-3xl font-extrabold text-teal-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {analytics.summary.overall_pass_rate}%
                </p>
                <div className="w-full bg-teal-200 rounded-full h-2 overflow-hidden mt-2 border border-teal-300">
                  <div className="bg-teal-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, analytics.summary.overall_pass_rate)}%` }} />
                </div>
              </div>

              {/* Total Attempts */}
              <div className="rounded-3xl p-5 border-3 transition-all hover:-translate-y-1"
                style={{ background: '#FAF5FF', border: '3px solid #A855F7', boxShadow: '4px 4px 0px #9333EA' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-2xl border-2" style={{ background: '#A855F720', borderColor: '#A855F7', color: '#7C3AED' }}>
                    <Trophy size={22} />
                  </div>
                  <span className="text-xs font-bold text-[var(--color-muted)] bg-white px-2 py-0.5 rounded-full border border-purple-200">Lượt nộp bài</span>
                </div>
                <p className="text-3xl font-extrabold text-purple-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {analytics.summary.total_attempts.toLocaleString()}
                </p>
                <p className="text-xs font-semibold text-purple-700">Lượt thi hoàn thành</p>
              </div>
            </div>

            {/* Time Trends & Daily/Monthly Charts */}
            <div className="clay-card p-6 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3 border-b-2 border-[var(--color-border)] pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-extrabold text-[var(--color-foreground)] flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    <TrendingUp className="text-purple-500" size={20} />
                    Xu hướng làm bài & Điểm số theo thời gian
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">Số bài thi nộp và điểm trung bình phân bổ theo mốc thời gian</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTimeTab('daily')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      timeTab === 'daily'
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-muted-bg)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                    }`}
                  >
                    7 ngày gần nhất
                  </button>
                  <button
                    onClick={() => setTimeTab('monthly')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      timeTab === 'monthly'
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-muted-bg)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                    }`}
                  >
                    6 tháng gần nhất
                  </button>
                </div>
              </div>

              {/* Bar Visualization */}
              {(() => {
                const points = timeTab === 'daily' ? analytics.time_series.daily : analytics.time_series.monthly;
                const maxAttempts = Math.max(...points.map((p) => p.attempts_count), 1);

                return (
                  <div className="pt-4 pb-2">
                    <div className="grid grid-cols-7 sm:grid-cols-6 lg:grid-cols-7 gap-2 items-end h-48 border-b-2 border-[var(--color-border-strong)] px-2 pb-2">
                      {points.map((pt, idx) => {
                        const heightPercent = Math.max(10, Math.round((pt.attempts_count / maxAttempts) * 100));
                        return (
                          <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                            {/* Hover tooltip / Label */}
                            <div className="text-[10px] font-bold text-[var(--color-muted)] bg-[var(--color-muted-bg)] px-1.5 py-0.5 rounded border border-[var(--color-border)] group-hover:scale-110 transition-all">
                              {pt.attempts_count} bài ({pt.avg_score}đ)
                            </div>
                            {/* Bar */}
                            <div
                              className="w-full max-w-[42px] bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-xl border-2 border-teal-700 shadow-sm transition-all duration-300 group-hover:from-teal-600 group-hover:to-teal-500"
                              style={{ height: `${heightPercent}%` }}
                            />
                            {/* X Axis Label */}
                            <span className="text-xs font-bold text-[var(--color-foreground)] truncate">{pt.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Subject Performance Breakdown */}
            <div>
              <h3 className="text-lg font-extrabold text-[var(--color-foreground)] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-heading)' }}>
                📚 Thống kê chỉ số theo Môn học ({analytics.subject_stats.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics.subject_stats.map((subj) => (
                  <div key={subj.subject_id} className="clay-card p-5 space-y-4 hover:-translate-y-1 transition-all">
                    <div className="flex items-center justify-between border-b-2 border-[var(--color-border)] pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-teal-100 border-2 border-teal-400 text-teal-700 flex items-center justify-center font-bold">
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-base text-[var(--color-foreground)]">{subj.subject_name}</h4>
                          <p className="text-xs text-[var(--color-muted)]">{subj.total_exams} đề thi · {subj.total_attempts} lượt làm</p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-teal-50 text-teal-700 border border-teal-200">
                        {subj.pass_rate}% Đạt
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-[var(--color-muted-bg)] p-2.5 rounded-xl border border-[var(--color-border)]">
                        <span className="text-[var(--color-muted)] block mb-0.5 font-semibold">Điểm trung bình</span>
                        <span className="text-lg font-extrabold text-teal-600" style={{ fontFamily: 'var(--font-heading)' }}>
                          {subj.avg_score} <span className="text-xs font-normal text-[var(--color-muted)]">/ 100</span>
                        </span>
                      </div>

                      <div className="bg-[var(--color-muted-bg)] p-2.5 rounded-xl border border-[var(--color-border)]">
                        <span className="text-[var(--color-muted)] block mb-0.5 font-semibold">Thời gian làm TB</span>
                        <span className="text-lg font-extrabold text-orange-600" style={{ fontFamily: 'var(--font-heading)' }}>
                          {formatDuration(subj.avg_time_seconds)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid 2 Columns: Exam Stats Table + Top Students Ranking */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Detailed Exam Stats (2 Cols) */}
              <div className="lg:col-span-2 clay-card p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-[var(--color-border)] pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-[var(--color-foreground)] flex items-center gap-2"
                      style={{ fontFamily: 'var(--font-heading)' }}>
                      📝 Bảng chi tiết kết quả theo Đề thi
                    </h3>
                    <p className="text-xs text-[var(--color-muted)]">Xem chi tiết thời gian, điểm TB và tỉ lệ đạt của từng đề thi</p>
                  </div>
                  <div className="w-full sm:w-60">
                    <Input
                      placeholder="Tìm đề thi..."
                      value={searchExam}
                      onChange={(e) => setSearchExam(e.target.value)}
                      leftIcon={<Search size={16} />}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b-2 border-[var(--color-border-strong)] bg-[var(--color-muted-bg)] text-[var(--color-foreground)] font-extrabold">
                        <th className="p-3">Tên đề thi</th>
                        <th className="p-3">Môn học</th>
                        <th className="p-3 text-center">Lượt thi</th>
                        <th className="p-3 text-center">Điểm TB</th>
                        <th className="p-3 text-center">Thời gian TB</th>
                        <th className="p-3 text-center">Cao/Thấp</th>
                        <th className="p-3 text-right">Tỉ lệ đạt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)] font-medium">
                      {filteredExams.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-[var(--color-muted)]">
                            Không tìm thấy đề thi phù hợp.
                          </td>
                        </tr>
                      ) : (
                        filteredExams.map((ex) => (
                          <tr key={ex.exam_id} className="hover:bg-[var(--color-muted-bg)] transition-colors">
                            <td className="p-3 font-bold text-[var(--color-foreground)]">{ex.exam_title}</td>
                            <td className="p-3 text-[var(--color-muted)]">{ex.subject_name}</td>
                            <td className="p-3 text-center font-bold">{ex.total_attempts}</td>
                            <td className="p-3 text-center font-extrabold text-teal-600">{ex.avg_score}</td>
                            <td className="p-3 text-center text-orange-600 font-semibold">{formatDuration(ex.avg_time_seconds)}</td>
                            <td className="p-3 text-center">
                              <span className="text-green-600 font-bold">{ex.highest_score}</span> / <span className="text-red-500 font-bold">{ex.lowest_score}</span>
                            </td>
                            <td className="p-3 text-right">
                              <span className={`inline-block px-2 py-0.5 rounded-md font-bold text-[11px] ${
                                ex.pass_rate >= 70 ? 'bg-green-100 text-green-700' : ex.pass_rate >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {ex.pass_rate}%
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Students Ranking (1 Col) */}
              <div className="clay-card p-6 space-y-4">
                <div className="border-b-2 border-[var(--color-border)] pb-3">
                  <h3 className="text-lg font-extrabold text-[var(--color-foreground)] flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    <Award className="text-amber-500" size={20} />
                    Top Học sinh xuất sắc
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">Bảng xếp hạng dựa trên điểm trung bình và số bài làm</p>
                </div>

                <div className="space-y-3">
                  {analytics.top_students.length === 0 ? (
                    <p className="text-xs text-[var(--color-muted)] text-center py-6">Chưa có lượt nộp bài nào.</p>
                  ) : (
                    analytics.top_students.map((st, index) => {
                      const rankMedals = ['🥇', '🥈', '🥉'];
                      const medal = index < 3 ? rankMedals[index] : `#${index + 1}`;

                      return (
                        <div key={st.user_id} className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--color-muted-bg)] border border-[var(--color-border)] hover:border-amber-400 transition-all">
                          <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center font-extrabold text-sm shrink-0">
                            {medal}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-[var(--color-foreground)] truncate">{st.full_name}</p>
                            <p className="text-[11px] text-[var(--color-muted)]">{st.attempts_count} bài thi · {st.passed_count} bài đạt</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-sm font-extrabold text-amber-600 block" style={{ fontFamily: 'var(--font-heading)' }}>
                              {st.avg_score}đ
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
