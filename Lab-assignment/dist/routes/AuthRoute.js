"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authService = __importStar(require("../services/AuthService"));
const authMiddleware = __importStar(require("../middleware/AuthMiddleware"));
const router = express_1.default.Router();
// Task 10: Register new user
router.post('/register', async (req, res) => {
    const registerRequest = req.body;
    try {
        const response = await authService.registerUser(registerRequest);
        res.status(201).json({ status: 'success', message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});
// Task 11: Update password
router.post('/updatePassword', authMiddleware.protect, async (req, res) => {
    const user = req.body.user;
    const { password } = req.body;
    try {
        await authService.updatePassword(user.id, password);
        res.status(200).json({
            status: 'success',
            user: {
                id: user.id,
                organizerName: user.organizer?.name || 'unknown',
                username: user.username,
                roles: user.roles.map((role) => role.name),
            },
        });
    }
    catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});
exports.default = router;
