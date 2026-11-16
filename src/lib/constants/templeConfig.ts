/**
 * Sri Durga Varahi Amma Devalayam - Pisini
 * IMMUTABLE TEMPLE CONFIGURATION & SECURITY RESTRICTIONS
 * 
 * CRITICAL SECURITY NOTICE:
 * All official phone numbers, PhonePe payment numbers, UPI IDs,
 * and WhatsApp contact details defined here are PERMANENTLY LOCKED
 * and RESTRICTED. They cannot be modified dynamically, via localStorage,
 * query parameters, or through the administrative portal.
 */

export interface TempleSecurityConfig {
  readonly PHONEPE_NUMBER: string;
  readonly UPI_ID: string;
  readonly PAYEE_NAME: string;
  readonly NOTE: string;
  readonly WHATSAPP_NUMBER: string;
  readonly WHATSAPP_INTERNATIONAL: string;
  readonly PHONE_PRIMARY: string;
  readonly PHONE_SECONDARY: string;
  readonly TEMPLE_EMAIL: string;
  readonly INSTAGRAM_URL: string;
  readonly FACEBOOK_URL: string;
  readonly IS_LOCKED: boolean;
  readonly SECURITY_LEVEL: string;
  readonly LOCK_POLICY: string;
}

const rawConfig: TempleSecurityConfig = {
  // Official PhonePe Number for Temple Donations (LOCKED)
  PHONEPE_NUMBER: "7569386212",

  // Official UPI VPA for Temple Donations (LOCKED)
  UPI_ID: "7569386212@ybl",

  // Official Beneficiary Title
  PAYEE_NAME: "Sri Durga Varahi Amma Devalayam",

  // Default Sacred Payment Transaction Note
  NOTE: "Temple Annadanam and Consecration Donation",

  // Official WhatsApp Support & Screenshot Verification Number (LOCKED)
  WHATSAPP_NUMBER: "8919418447",
  WHATSAPP_INTERNATIONAL: "+91 89194 18447",

  // Official Temple Contact Lines (LOCKED)
  PHONE_PRIMARY: "+91 89194 18447",
  PHONE_SECONDARY: "+91 96427 49187",

  // Official Email
  TEMPLE_EMAIL: "info@varahiammatemple.org",

  // Official Social Media Channels (LOCKED)
  INSTAGRAM_URL: "https://www.instagram.com/sridurgavarahiammapisini/?hl=en",
  FACEBOOK_URL: "https://www.facebook.com/profile.php?id=61596476287591",

  // Security Flags
  IS_LOCKED: true,
  SECURITY_LEVEL: "MAXIMUM_IMMUTABLE",
  LOCK_POLICY: "HARD_LOCKED_NO_OVERRIDE",
};

// Freeze the object to prevent any runtime modification, property addition, or deletion
export const TEMPLE_CONFIG: Readonly<TempleSecurityConfig> = Object.freeze(rawConfig);
