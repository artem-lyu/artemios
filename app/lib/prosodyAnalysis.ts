
import { HumeClient } from 'hume'
import * as fs from "fs"

export async function prosodyAnalysis(filepath: string) {

    const client = new HumeClient({ apiKey: process.env.HUME_API_KEY })
    const audio = fs.createReadStream(filepath)

    // const jobLocal = await client.expressionMeasurement.batch.startInferenceJobFromLocalFile([audio],{})

    const job = await client.expressionMeasurement.batch.startInferenceJob({
        urls: ["https://storage.googleapis.com/hume-test-data/audio/ninth-century-laugh.mp3"],
        models: {
            prosody: {}
        }
    })

    console.log("Running job...")

    const predictions = await client.expressionMeasurement.batch.getJobPredictions(
        job.jobId
    )

    console.log(JSON.stringify(predictions))


}

