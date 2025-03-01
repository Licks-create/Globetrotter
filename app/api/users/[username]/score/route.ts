/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "users.json")

const readUsersData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return []
    }

    const data = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading users data:", error)
    return []
  }
}

export async function GET(request: Request, { params }: { params: { username: string } }) {
  try {
    const username = decodeURIComponent(params.username)

    const users = readUsersData()

    const user = users.find((user: any) => user.username === username)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      username: user.username,
      correct: user.score.correct,
      incorrect: user.score.incorrect,
    })
  } catch (error) {
    console.error("Error fetching user score:", error)
    return NextResponse.json({ error: "Failed to fetch user score" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { username: string } }) {
  try {
    const { username='users', correct=0, incorrect=5} = await request.json()

    const users = readUsersData()
    const userIndex = users.findIndex((user: any) => user.username === username)
    
    console.log({userIndex})
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    users[userIndex].score = {
      correct,
      incorrect,
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2))
 
    return NextResponse.json({
      success: true,
      message: "Score updated successfully",
    })
  } catch (error) {
    console.error("Error updating user score:", error)
    return NextResponse.json({ error: "Failed to update user score" }, { status: 500 })
  }
}

