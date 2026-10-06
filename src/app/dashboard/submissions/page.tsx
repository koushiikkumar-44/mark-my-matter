import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, FileText, Send, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { createClient } from "@/utils/supabase/server"

import { AddSubmissionDialog } from "@/components/AddSubmissionDialog"

export default async function SubmissionsWorkflow() {
  const supabase = await createClient()
  const { data: submissions } = await supabase.from('submissions').select('*')
  
  const subs = submissions || []

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Submissions</h1>
          <p className="text-slate-500">Automate and track directory and award submissions.</p>
        </div>
        <AddSubmissionDialog />
      </div>

      <Tabs defaultValue="active" className="w-full">
        <div className="flex items-center justify-between border-b pb-2 mb-6">
          <TabsList className="bg-transparent h-auto p-0 space-x-6">
            <TabsTrigger 
              value="active" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 pb-2 text-slate-500 data-[state=active]:text-slate-900 font-medium"
            >
              Active (12)
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 pb-2 text-slate-500 data-[state=active]:text-slate-900 font-medium"
            >
              Completed (48)
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 hidden sm:flex">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search submissions..." className="pl-9 h-9 text-sm" />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subs.map((sub) => (
              <Card key={sub.id} className="flex flex-col hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-slate-50 text-slate-500 font-mono text-[10px]">
                      {sub.id}
                    </Badge>
                    <Badge variant={sub.status === "Lawyer Review" ? "secondary" : "default"}
                           className={sub.status === "Lawyer Review" ? "bg-amber-100 text-amber-800" : "bg-slate-800"}>
                      {sub.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">{sub.title}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium mt-1">
                    {sub.practice}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                        <span>Completion</span>
                        <span>{sub.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${sub.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-md">
                      <Clock className="w-4 h-4 text-amber-500" />
                      Due: <span className="font-semibold text-slate-900">{sub.deadline}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center bg-slate-50/50 rounded-b-lg">
                  <div className="flex -space-x-2">
                    {sub.assignees?.map((init: string, i: number) => (
                      <Avatar key={i} className="w-8 h-8 border-2 border-white">
                        <AvatarFallback className="text-xs bg-slate-200 text-slate-700">{init}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button size="sm" variant={sub.status === "Not Started" ? "default" : "outline"} className={sub.status === "Not Started" ? "bg-blue-600" : ""}>
                    {sub.status === "Not Started" ? "Auto-Populate" : "Continue"}
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Empty State / Add New Card */}
            <Card className="flex flex-col border-dashed border-2 bg-transparent items-center justify-center text-center p-6 h-[320px] hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                <Plus className="w-6 h-6 text-slate-400 group-hover:text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">Start a Submission</h3>
              <p className="text-sm text-slate-500 max-w-[200px]">Create a new draft and auto-populate it with matter data.</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

