import { NextResponse } from "next/server"
import  destinations1  from "@/data/cities_data.json"

// console.log({destinations1,destinations})
export async function GET() {
  try {
    const randomIndex = Math.floor(Math.random() * destinations1.length)
    const selectedDestination = destinations1[randomIndex]

    let options = [selectedDestination.city]

    while (options.length < 4) {
      const randomDestIndex = Math.floor(Math.random() * destinations1.length)
      const randomDest = destinations1[randomDestIndex]

      if (!options.includes(randomDest.city) && randomDest.city !== selectedDestination.city) {
        options.push(randomDest.city)
      }
    }

    options = options.sort(() => Math.random() - 0.5)

    return NextResponse.json({
      destination: selectedDestination,
      options,
    })
  } catch (error) {
    console.error("Error fetching random destination:", error)
    return NextResponse.json({ error: "Failed to fetch random destination" }, { status: 500 })
  }
}

