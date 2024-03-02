const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - email
 *              - password
 *              - no_telp
 *          properties:
 *              username:
 *                  type: string
 *                  description: The username
 *              email:
 *                  type: string
 *                  format: email
 *                  description: The email address
 *              password:
 *                  type: string
 *                  description: The user's password
 *              no_telp:
 *                  type: string
 *                  description: The user's phone number
 *          example:
 *              username: example10
 *              email: example10@gmail.com
 *              password: example10
 *              no_telp: "08123456789"
 */

/** 
 * @swagger
 * tags:
 *  name: Auth
 *  description: The Auth managing API
*/

/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Register a new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: The user is successfully registered
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.post('/register', authController.register);

/** 
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Login to the application
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              description: The email address
 *                              example: example10@gmail.com
 *                          password:
 *                              type: string
 *                              description: The user's password
 *                              example: example10
 *      responses:
 *          200:
 *              description: Successfully logged in
 *              content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
*/
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/otp:
 *  post:
 *      summary: Generate OTP for user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              description: The email address
 *                              example: example10@gmail.com
 *      responses:
 *         200:
 *          description: OTP is successfully generated
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *                  
*/
router.post('/otp', authController.generateOtp);

/** 
 * @swagger
 * /auth/verify-otp:
 *  post:
 *      summary: Verify OTP for user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              description: The email address
 *                              example: example10@gmail.com
 *                          otp:
 *                              type: string
 *                              description: The OTP
 *                              example: 123456
 *      responses:
 *         200:
 *          description: OTP is successfully verified
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
*/
router.post('/verify-otp', authController.verifyOtp);

/** 
 * @swagger
 * /auth/logout:
 *  post:
 *      summary: Logout from the application
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: Successfully logged out
*/
router.post('/logout', authController.logout);

module.exports = router;