import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react"

import { createClient } from "@/utils/supabase/server"
import { AddMatterDialog } from "@/components/AddMatterDialog"

export default async function MattersDirectory() {
  const supabase = await createClient();
  const { data: matters } = await supabase.from('matters').select();

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Matters Directory</h1>
          <p className="text-slate-500">Manage and view all firm matters and deals.</p>
        </div>
        <AddMatterDialog />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search matters by name, client, or ID..." className="pl-9 bg-slate-50 border-slate-200" />
        </div>
        <Button variant="outline" className="w-full sm:w-auto text-slate-600 border-slate-200">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm flex-1 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[120px]">Matter ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Practice Area</TableHead>
              <TableHead>Deal Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matters?.map((matter) => (
              <TableRow key={matter.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium text-slate-600">{matter.id}</TableCell>
                <TableCell className="font-semibold text-slate-900">{matter.title}</TableCell>
                <TableCell>{matter.client}</TableCell>
                <TableCell>{matter.practice}</TableCell>
                <TableCell className="text-slate-600">{matter.value}</TableCell>
                <TableCell>
                  <Badge variant={matter.status === "Closed" ? "default" : matter.status === "Active" ? "secondary" : "outline"} 
                         className={
                           matter.status === "Closed" ? "bg-slate-800 hover:bg-slate-700" :
                           matter.status === "Active" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : 
                           "text-amber-700 border-amber-300"
                         }>
                    {matter.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
