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
const service = __importStar(require("../services/EventService"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize) || 3;
        const pageNo = parseInt(req.query.pageNo) || 1;
        const keyword = req.query.keyword;
        const result = await service.getAllEventsWithPagination(keyword, pageSize, pageNo);
        if (result.events.length === 0) {
            res.status(404).send("No event found");
            return;
        }
        res.setHeader("x-total-count", result.count.toString());
        res.json(result.events);
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send("Internal server error");
    }
    finally {
        const pageNo = parseInt(req.query.pageNo) || 1;
        const pageSize = parseInt(req.query.pageSize) || 3;
        console.log(`Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`);
    }
});
router.get("/events", async (req, res) => {
    try {
        console.log("getAllEventsWithPagination called with include");
        const pageSize = parseInt(req.query.pageSize) || 3;
        const pageNo = parseInt(req.query.pageNo) || 1;
        const keyword = req.query.keyword;
        const result = await service.getAllEventsWithPagination(keyword, pageSize, pageNo);
        if (result.events.length === 0) {
            res.status(404).send("No event found");
            return;
        }
        res.setHeader("x-total-count", result.count.toString());
        res.json(result.events);
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send("Internal server error");
    }
    finally {
        const pageNo = parseInt(req.query.pageNo) || 1;
        const pageSize = parseInt(req.query.pageSize) || 3;
        console.log(`Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const event = await service.getEventById(id);
        if (event) {
            res.json(event);
        }
        else {
            res.status(404).send("Event not found");
        }
    }
    catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).send("Internal server error");
    }
    finally {
        console.log(`Request to get event ${req.params.id} is completed`);
    }
});
router.post("/", async (req, res) => {
    try {
        const newEvent = req.body;
        const createdEvent = await service.addEvent(newEvent);
        res.status(201).json(createdEvent);
    }
    catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send("Internal server error");
    }
    finally {
        console.log("Request to create event is completed");
    }
});
exports.default = router;
