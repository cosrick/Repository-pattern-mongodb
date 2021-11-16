export * from './admin';

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound This User was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "mesaage": "User Not Found"
 *     }
 *
 */

/**
 * @apiDefine UnprocessableEntityError
 *
 * @apiError UnprocessableEntity The given paramaters didn't match the expectation
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "error": "id is required"
 *       "detail": "id is required"
 *     }
 *
 */

/**
 * @apiDefine InternalServerError
 *
 * @apiError InternalError Error occured in the internal server
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal Server Error"
 *     }
 *
 */