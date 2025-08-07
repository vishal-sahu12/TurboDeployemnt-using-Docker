import { User} from "db/db"

export default async function Home() {
  const users = await User.find();
  return(
    <div>
      {JSON.stringify(users)}
    </div>
  )
}

// export const dynamic = 'force-dynamic'

export const revalidate =60
