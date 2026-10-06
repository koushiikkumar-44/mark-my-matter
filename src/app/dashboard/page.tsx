import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, FileWarning, TrendingUp, Users } from "lucide-react"
import { createClient } from "@/utils/supabase/server"

export default async function Dashboard() {
  const supabase = await createClient()

  const { count: submissionsCount } = await supabase
    .from('submissions')
    .select('*', { count: 'exact', head: true })

  const { count: mattersCount } = await supabase
    .from('matters')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here's an overview of your submission pipelines.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Submissions</CardTitle>
            <Clock className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissionsCount || 0}</div>
            <p className="text-xs text-slate-500 mt-1">
              Total active submissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed (YTD)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
              +14% from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Lawyer Review</CardTitle>
            <FileWarning className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mattersCount || 0}</div>
            <p className="text-xs text-slate-500 mt-1">
              Matters requiring lawyer review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lawyer Engagement</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-slate-500 mt-1">
              Response rate to BD requests
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Legal directories and awards submissions due in the next 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { title: "Chambers Global 2027", practice: "Corporate/M&A", status: "Drafting", date: "Oct 15, 2026", color: "bg-amber-100 text-amber-700" },
                { title: "Legal 500 Asia Pacific", practice: "Dispute Resolution", status: "In Review", date: "Oct 22, 2026", color: "bg-blue-100 text-blue-700" },
                { title: "IFLR1000", practice: "Banking & Finance", status: "Lawyer Input Req.", date: "Nov 05, 2026", color: "bg-red-100 text-red-700" },
                { title: "Benchmark Litigation", practice: "White-Collar Crime", status: "Ready", date: "Nov 10, 2026", color: "bg-emerald-100 text-emerald-700" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.practice}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-medium text-slate-900">{item.date}</div>
                    <Badge variant="secondary" className={item.color}>{item.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Needs Attention</CardTitle>
            <CardDescription>
              Tasks requiring your immediate action.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { task: "Review Project Phoenix deal value", assigned: "David Chen", type: "Deal Review" },
                { task: "Approve updated lawyer bios", assigned: "Sarah Williams", type: "Profile" },
                { task: "Missing client referee contacts", assigned: "M&A Team", type: "Data Collection" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-slate-50 border">
                  <div className="mt-0.5 rounded-full p-1 bg-white border shadow-sm">
                    <FileWarning className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 leading-none">{item.task}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-slate-500">Waiting on: {item.assigned}</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">{item.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
