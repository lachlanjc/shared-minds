const REPLICATE_PROXY = "https://replicate-api-proxy.glitch.me";

export async function getAIImage(
  prompt: string,
  width: number,
  height: number,
) {
  const data = {
    version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    input: {
      prompt,
      width,
      height,
    },
  };
  let url = REPLICATE_PROXY + "/create_n_get/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(url, options).then((res) => res.json());
  if (res.output.length == 0) {
    console.error("Something went wrong");
    return null;
  } else {
    let imageURL = res.output[0];
    return imageURL;
  }
}
