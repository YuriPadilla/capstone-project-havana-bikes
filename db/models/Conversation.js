import mongoose from "mongoose";

const { Schema } = mongoose;

const emailTrackingSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["not_sent", "sent", "failed"],
      default: "not_sent",
    },
    sentAt: Date,
    failedAt: Date,
    error: { type: String, trim: true },
  },
  { _id: false }
);

const conversationSchema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
    confirmationEmail: {
      type: emailTrackingSchema,
      default: () => ({}),
    },
    adminNotificationEmail: {
      type: emailTrackingSchema,
      default: () => ({}),
    },
    emailStatus: {
      customerConfirmation: {
        type: String,
        enum: ["not_sent", "sent", "failed"],
        default: "not_sent",
      },
      adminNotification: {
        type: String,
        enum: ["not_sent", "sent", "failed"],
        default: "not_sent",
      },
    },
    messages: [
      {
        sender: {
          type: String,
          required: true,
          enum: ["customer", "admin"],
        },
        message: { type: String, required: true, trim: true },
        createdAt: { type: Date, default: Date.now },
        emailStatus: {
          type: String,
          enum: ["not_sent", "sent", "failed"],
          default: "not_sent",
        },
        emailSentAt: Date,
        emailError: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default Conversation;
