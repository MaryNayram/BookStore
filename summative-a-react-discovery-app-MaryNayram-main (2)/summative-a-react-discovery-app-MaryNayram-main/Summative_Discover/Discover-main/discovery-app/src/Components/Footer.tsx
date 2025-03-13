import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FaInstagram, FaLinkedinIn, FaPhoneAlt, FaFacebookF, FaXTwitter } from "react-icons/fa6";

// Social Media Links
const socialLinks = [
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: FaXTwitter, label: "Twitter" },
  { icon: FaFacebookF, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 px-6 md:px-20 rounded-t-3xl mx-auto">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="space-y-6">
          <ContactInfo
            Icon={IoLocationOutline}
            text={
              <>
                African Leadership University
                <span className="block">Kigali, Rwanda</span>
              </>
            }
          />
          <ContactInfo Icon={FaPhoneAlt} text="+250 799 303 372" />
          <ContactInfo Icon={MdOutlineMail} text="nayrammayakosua@gmail.com" />
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h2 className="font-bold text-xl text-accent">About Discover</h2>
          <p className="text-gray-300 max-w-lg">
            Discover your next favorite book with ease! Our platform connects readers with a vast collection of titles, offering personalized recommendations and seamless browsing to spark your literary journey.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, label }, index) => (
              <Icon
                key={index}
                size={35}
                className="p-2 bg-gray-800 text-white rounded-md cursor-pointer transition-all hover:bg-accent"
                aria-label={label}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Reusable Contact Info Component
function ContactInfo({ Icon, text }: { Icon: React.ElementType; text: React.ReactNode }) {
  return (
    <div className="flex gap-4 items-center">
      <Icon size={40} className="p-2 bg-gray-800 text-white rounded-full cursor-pointer hover:bg-gray-600" />
      <p className="text-gray-300">{text}</p>
    </div>
  );
}
