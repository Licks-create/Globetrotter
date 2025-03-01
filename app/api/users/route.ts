/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "users.json")

const readUsersData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true })
      fs.writeFileSync(dataFilePath, JSON.stringify([]))
      return []
    }

    const data = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading users data:", error)
    return []
  }
}

const writeUsersData = (data: any) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error("Error writing users data:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const { username } = await request.json()

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const users = readUsersData()

    const existingUser = users.find((user: any) => user.username === username)

    if (existingUser) {
      return NextResponse.json({ success: true, message: "User already exists" })
    }

    const newUser = {
      username,
      score: {
        correct: 0,
        incorrect: 0,
      },
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    const success = writeUsersData(users)

    if (!success) {
      return NextResponse.json({ error: "Failed to save user data" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "User created successfully" })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

