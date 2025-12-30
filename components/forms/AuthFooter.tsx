import Link from "next/link"

const AuthFooter = ({text, linkText, href} : {text: string, linkText : string, href : string}) => {
  return (
    <p className="mt-4 text-center text-sm text-muted-foreground">
      {text} :
      <Link
        href={href}
        className="font-medium text-primary hover:underline"
      >
        {` ${linkText}`}
      </Link>
    </p>
  )
}

export default AuthFooter
