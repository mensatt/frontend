// Yes I did do be lazy and just copied this from the old codebase 👍


export type StarIconProps = {
  percentage?: number
}

const StarIcon = ({ percentage = 100 }: StarIconProps) => {
  const id = `star-${percentage}`
  return (
    <svg
      viewBox="0 0 15 15"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xml-space="preserve"
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-line-join="round"
      stroke-miterlimit={2}
    >
      <path
        d="m6.98 1.252l-.022.05L5.588 4.6a.3.3 0 0 1-.253.184l-3.561.286l-.055.004l-.331.027l-.3.024a.3.3 0 0 0-.172.527l.23.196l.252.216l.041.036l2.713 2.324a.3.3 0 0 1 .097.297l-.83 3.475l-.012.053l-.077.323l-.07.294a.3.3 0 0 0 .448.326l.258-.158l.284-.173l.046-.028l3.049-1.863a.3.3 0 0 1 .312 0l3.049 1.863l.046.028l.284.173l.258.158a.3.3 0 0 0 .448-.326l-.07-.293l-.077-.324l-.013-.053l-.829-3.475a.3.3 0 0 1 .097-.297L13.562 6.1l.041-.036l.253-.216l.23-.196a.3.3 0 0 0-.172-.527l-.3-.024l-.332-.027l-.055-.004l-3.56-.286a.3.3 0 0 1-.254-.184L8.042 1.302l-.021-.05l-.128-.307l-.116-.279a.3.3 0 0 0-.554 0l-.116.279l-.128.307Zm.52 1.352l-.99 2.38a1.3 1.3 0 0 1-1.096.797l-2.57.206l1.958 1.677a1.3 1.3 0 0 1 .418 1.29l-.598 2.507l2.2-1.344a1.3 1.3 0 0 1 1.356 0l2.2 1.344l-.598-2.508a1.3 1.3 0 0 1 .418-1.289l1.958-1.677l-2.57-.206a1.3 1.3 0 0 1-1.096-.797l-.99-2.38Z"
        fill="var(--color-yellow60)"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
      <clipPath id={id}>
        <rect x="0" y="0" width={(percentage / 100) * 15} height="15" />
      </clipPath>
      <g clip-path={`url(#${id})`}>
        <path
          d="M7.223.666a.3.3 0 0 1 .554 0L9.413 4.6a.3.3 0 0 0 .253.184l4.248.34a.3.3 0 0 1 .171.528L10.85 8.424a.3.3 0 0 0-.097.297l.99 4.145a.3.3 0 0 1-.45.326L7.657 10.97a.3.3 0 0 0-.312 0l-3.637 2.222a.3.3 0 0 1-.448-.326l.989-4.145a.3.3 0 0 0-.097-.297L.915 5.652a.3.3 0 0 1 .171-.527l4.248-.34a.3.3 0 0 0 .253-.185L7.223.666Z"
          fill="var(--color-yellow)"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  )
}

export default StarIcon
