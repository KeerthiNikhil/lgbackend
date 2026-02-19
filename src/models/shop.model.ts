import mongoose, { Schema, Document } from "mongoose";

export interface IShop extends Document {
  vendorId: mongoose.Types.ObjectId;

  ownerName: string;
  businessType: string;
  shopName: string;
  logo?: string;
  description: string;
  yearsOfOperation?: number;

  address: string;
  area: string;
  latitude?: number;
  longitude?: number;

  gstNumber?: string;
  shopLicense?: string;
  udyamNumber?: string;
  fssaiNumber?: string;
  tradeLicense?: string;

  documentUploads?: {
    shopLicenseFile?: string;
    fssaiFile?: string;
    gstCertificateFile?: string;
  };

  verificationStatus: "pending" | "approved" | "rejected";
}

const shopSchema = new Schema<IShop>(
  {
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true
    },

    ownerName: { type: String, required: true },
    businessType: { type: String, required: true },
    shopName: { type: String, required: true },
    logo: { type: String },
    description: { type: String, required: true },
    yearsOfOperation: { type: Number },

    address: { type: String, required: true },
    area: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },

    gstNumber: { type: String },
    shopLicense: { type: String },
    udyamNumber: { type: String },
    fssaiNumber: { type: String },
    tradeLicense: { type: String },

    documentUploads: {
      shopLicenseFile: { type: String },
      fssaiFile: { type: String },
      gstCertificateFile: { type: String }
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model<IShop>("Shop", shopSchema);
