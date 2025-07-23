import { post } from "../../services/api"

export async function signXML(XML: string): Promise<string> {
  try {
    const signedXML = await post(
      'https://localhost:8443/sign-xml', 
      XML,
      ''
    )

    return signedXML
  } catch (error: any) {
    console.error("error when sign XML:", error?.response?.data || error.message)
    throw new Error("fail when sign XML")
  }
}