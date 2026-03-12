/**
 * POST /api/render — Stub de génération IA
 * À remplacer par l'appel API réel (OpenAI DALL-E, Stable Diffusion, etc.)
 */
export default defineEventHandler(async event => {
  const body = await readBody<{ prompt: string; outputType: '2d' | '3d' }>(
    event
  )

  if (!body?.prompt?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Le prompt est requis',
    })
  }

  // ─── TODO : brancher l'API IA ici ──────────────────────────────────────────
  //
  // Exemple OpenAI DALL-E 3 :
  // const res = await $fetch('https://api.openai.com/v1/images/generations', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  //   body: {
  //     model: 'dall-e-3',
  //     prompt: `Architecture rendering: ${body.prompt}`,
  //     n: 1,
  //     size: '1024x1024',
  //   },
  // })
  // return { imageUrl: res.data[0].url }
  //
  // Exemple Stable Diffusion via Replicate :
  // const res = await $fetch('https://api.replicate.com/v1/predictions', { ... })
  // return { imageUrl: res.output[0] }
  // ──────────────────────────────────────────────────────────────────────────

  return {
    status: 'placeholder',
    prompt: body.prompt,
    outputType: body.outputType,
    imageUrl: null as string | null,
    message:
      'API IA non configurée — voir server/api/render.post.ts pour brancher OpenAI ou Stable Diffusion',
  }
})
