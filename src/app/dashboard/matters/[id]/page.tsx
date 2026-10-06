import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, FileText, Users, DollarSign, Calendar, Clock, Download } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
export default async function MatterDetails({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: dbMatter } = await supabase
    .from("matters")
    .select("*")
    .eq("id", params.id)
    .single()

  const matter = {
    id: dbMatter?.id || params.id || "MTR-2026-101",
    title: dbMatter?.title || "Project Phoenix Acquisition",
    client: "TechCorp Global",
    practice: dbMatter?.practice_area || "Corporate/M&A",
    status: "Closed",
    value: dbMatter?.deal_value || "$450,000,000",
    openedDate: "Jan 12, 2026",
    closedDate: "Sep 30, 2026",
    description: "Representation of TechCorp Global in its $450 million acquisition of Phoenix Innovations, a leading AI software company. The transaction involved complex intellectual property transfers and cross-border regulatory approvals in the US and EU.",
    team: [
      { name: "Jane Smith", role: "Lead Partner" },
      { name: "David Chen", role: "Senior Associate" },
      { name: "Sarah Williams", role: "IP Specialist" }
    ],
    submissions: [
      { name: "Chambers Global 2027", status: "Drafting" },
      { name: "Legal 500 M&A Tier 1", status: "Submitted" }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/matters">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{matter.title}</h1>
            <Badge variant="default" className="bg-slate-800">{matter.status}</Badge>
          </div>
          <p className="text-slate-500 font-mono text-sm">{matter.id} • {matter.client}</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Matter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Matter Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-2">Description</h3>
                <p className="text-slate-900 leading-relaxed">{matter.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t">
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                    <BriefcaseIcon className="w-4 h-4" /> Practice
                  </div>
                  <div className="font-semibold">{matter.practice}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                    <DollarSign className="w-4 h-4" /> Deal Value
                  </div>
                  <div className="font-semibold">{matter.value}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                    <Calendar className="w-4 h-4" /> Opened
                  </div>
                  <div className="font-semibold">{matter.openedDate}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-1">
                    <Clock className="w-4 h-4" /> Closed
                  </div>
                  <div className="font-semibold">{matter.closedDate}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="team">
            <TabsList>
              <TabsTrigger value="team">Deal Team</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="narratives">Marketing Narratives</TabsTrigger>
            </TabsList>
            <TabsContent value="team" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {matter.team.map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{member.name}</div>
                            <div className="text-sm text-slate-500">{member.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Additional Tabs Content would go here */}
          </Tabs>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submissions</CardTitle>
              <CardDescription>Directory pitches using this matter.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matter.submissions.map((sub, i) => (
                  <div key={i} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg border">
                    <div className="font-medium text-slate-900">{sub.name}</div>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">{sub.status}</Badge>
                      <Button variant="link" size="sm" className="h-auto p-0 text-blue-600">View</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800">
                <FileText className="w-4 h-4 mr-2" />
                Add to Submission
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-3 text-slate-500" />
                Export as Chambers Form
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-3 text-slate-500" />
                Export as Legal 500 Form
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-3 text-slate-500" />
                Download Deal Sheet (PDF)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}
