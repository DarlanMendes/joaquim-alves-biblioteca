import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
 
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_KEY as string,
      
    }),
    // ...add more providers here
   
  ],
  secret:process.env.NEXT_PUBLIC_JWT_SECRET as string
}
export default NextAuth(authOptions)
