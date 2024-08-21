import { expressionCoordinates } from "@/utils/emotionGrid";

interface VAD {
    valence: number;
    arousal: number;
    dominance: number;
}

interface ExpressionCoordinates {
    [key: string]: [number, number, number] | undefined;
}

const extractVADValues = (messages: any[]): VAD[] => {
    return messages
        .filter((message) => message['role'] === "user")
        .map((message) => {
            const emotionScores = message['prosody']['scores'] ?? {};
            const validEmotions = Object.keys(emotionScores)
                .map(emotion => ({
                    emotion,
                    score: emotionScores[emotion],
                    vad: expressionCoordinates[emotion]
                }))
                .filter(({ vad }) => vad[0] !== null && vad[1] !== null && vad[2] !== null)
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)

            if (validEmotions.length === 0) {
                return {
                    valence: 0,
                    arousal: 0,
                    dominance: 0,
                }
            }

            const totalScore = validEmotions.reduce((acc, { score }) => acc + score, 0);

            const weightedVAD = validEmotions.reduce((acc, { score, vad }) => {
                acc.valence += (vad[0]! * score) / totalScore;
                acc.arousal += (vad[1]! * score) / totalScore;
                acc.dominance += (vad[2]! * score) / totalScore;
                return acc;
            }, {valence: 0, arousal: 0, dominance: 0})

            return weightedVAD;
        })

}

export default extractVADValues;