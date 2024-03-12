import Image from "next/image"
import Link from "next/link"
import { FaHeart, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>

        {/* <p style={{ display: 'flex', alignItems: 'center' }}>Made with <FaHeart style={{ color: 'red', fontSize: '24px', marginRight: '6px', marginLeft: '6px' }} />by Mann Savani. All Rights reserved.</p> */}
        <p>2024 Evently. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer