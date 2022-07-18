export function SingleResponse(
  message: string,
  success: boolean,
  result: any = null
): any {
  const response = {
    message,
    success,
    result,
  };
  return response;
}
