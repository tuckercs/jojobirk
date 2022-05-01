const pageTransitionSpeed = 300

const fadeAnim = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.1,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
}

export { pageTransitionSpeed, fadeAnim }
