"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { getAuth } from "@/lib/auth"
import { MessageSquare, Send, User } from "lucide-react"

type Message = {
  id: string
  from: string
  subject: string
  message: string
  timestamp: string
  read: boolean
}

export default function FarmerMessagesPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAuth = getAuth()
    if (!storedAuth) {
      router.replace("/login")
      return
    }
    setAuthChecked(true)

    // For now, messages are not implemented, so empty
    setMessages([])
    setLoading(false)
  }, [router])

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-muted-foreground">Loading messages...</p>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with buyers and manage your conversations.
          </p>
        </div>

        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className={message.read ? "" : "border-primary"}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{message.from}</h3>
                        <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <h4 className="font-medium mb-2">{message.subject}</h4>
                      <p className="text-muted-foreground text-sm">{message.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Messages Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Messages from buyers and system notifications will appear here.
              </p>
              <p className="text-sm text-muted-foreground">
                Start selling products to receive inquiries from potential buyers.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}