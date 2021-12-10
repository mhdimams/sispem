export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; message: "Timeout Error"; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; message: "Connection Error" | "Network Error"; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server"; message: 'SERVER_ERROR' }
  | { kind: "service-unavailable"; message: "503 Service Unavailable" }
  | { kind: "bad-gateway"; message: "502 Bad Gateway" }
  | { kind: "internal-server-error"; message: "500 Internal Server Error" }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; message: "Your session has expired" }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; message: "403 Forbidden" }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found"; message: "404 Not Found" }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected"; message: "rejected" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data"; message: "Not expected format" }
  /**
   * The data we send is not in the expected format.. This is 400.
   */
  | { kind: "bad-request"; message: "Bad Request" }

  | { kind: "cancel-error"; message: "cancel-error" }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(status: number, response: any): GeneralApiProblem | void {
  switch (status) {
    case 503:
      return { kind: "service-unavailable", message: "503 Service Unavailable" }
    case 502:
      return { kind: "bad-gateway", message: "502 Bad Gateway" }
    case 500:
      return { kind: "internal-server-error", message: "500 Internal Server Error" }
    case 400: {
      return { kind: "bad-request", message: response.message ? response.message.toString() : response.error_description }
    }
    case 401:
      return { kind: "unauthorized", message: "Your session has expired" }
    case 403:
      return { kind: "forbidden", message: "403 Forbidden" }
    case 404:
      return { kind: "not-found", message: "404 Not Found" }
    default: {
      return {
        kind: "server",
        message: response.message.toString()
      }
    }
  }
}
