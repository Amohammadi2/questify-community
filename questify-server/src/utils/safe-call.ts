export async function safeCall<T> (errorMap: any, serviceCallback: () => Promise<T>): Promise<T> {
  try {
    return await serviceCallback();
  }
  catch(e) {
    if (e.message in errorMap)
      throw errorMap[e.message];
    throw e;
  }
}