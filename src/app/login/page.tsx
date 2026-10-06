import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Scale } from 'lucide-react'
import Link from 'next/link'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message: string }> }) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-6 px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">MarkMyMatter</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to your account to manage your firm's matters</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your email and password below</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="lawyer@firm.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              
              {resolvedSearchParams?.message && (
                <p className="text-sm font-medium text-destructive mt-4 text-center">
                  {resolvedSearchParams.message}
                </p>
              )}
              
              <div className="flex flex-col gap-2 pt-4">
                <Button type="submit" formAction={login} className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
                <Button type="submit" formAction={signup} variant="outline" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
