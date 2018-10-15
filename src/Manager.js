import { debounce } from './utils/func';
import { getBestAnchorGivenScrollLocation, getScrollTop } from './utils/scroll';
import { getHash, updateHash, removeHash } from './utils/hash';

const defaultConfig = {
  offset: -1,
  keepLastAnchorHash: false
}

class Manager {
  constructor() {
    this.anchors = {};
    this.forcedHash = false;
    this.config = defaultConfig;

    this.scrollHandler = debounce(this.handleScroll, 100);
    this.forceHashUpdate = debounce(this.handleHashChange, 1);

    this.basePath = this.getBasePath();
    this.baseTitle = document.title;
  }

  getBasePath = (anchors) => {
    let newBasePath = `${window.location.origin}${window.location.pathname}`.replace(/\/$/, '');

    if (anchors) {
      Object.keys(anchors).forEach(id => {
        if (!anchors[id].exact && newBasePath.endsWith(anchors[id].name)) {
          newBasePath = newBasePath.replace(`/${anchors[id].name}`, '');
        }
      });
    }

    return newBasePath;
  }

  addListeners = () => {
    window.addEventListener('scroll', this.scrollHandler, false);
    window.addEventListener('hashchange', this.handleHashChange);
  }

  removeListeners = () => {
    window.removeEventListener('scroll', this.scrollHandler, false);
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  configure = (config) => {
    this.config = {
      ...defaultConfig,
      ...config
    }
  }

  goToTop = () => {
    if (getScrollTop() === 0) return;
    this.forcedHash = true;
    window.scroll(0, 0);
  }

  addAnchor = ({element, name, hash, id, title, exact}) => {
    // if this is the first anchor, set up listeners
    if (Object.keys(this.anchors).length === 0) {
      this.addListeners();
    }
    this.forceHashUpdate();
    this.anchors[id] = {
      component: element,
      name,
      hash,
      title,
      exact
    };

    // check if this anchor is the current one
    if (window.location.href.endsWith(`${name}${hash ? `#${hash}` : ''}`)) {
      this.basePath = this.basePath.replace(`/${name}`, '');
      // scroll to this section
      setTimeout(() => {
        this.goToSection(id);
        if (title) {
          document.title = title;
        }
      }, 10);
    }
  }

  removeAnchor = (id) => {
    delete this.anchors[id]
    // if this is the last anchor, remove listeners
    if (Object.keys(this.anchors).length === 0) {
      this.removeListeners()
    }
  }

  handleScroll = () => {
    const {offset, keepLastAnchorHash} = this.config;
    const bestAnchorId = getBestAnchorGivenScrollLocation(this.anchors, offset);

    if (bestAnchorId && getHash({manager: this}) !== bestAnchorId) {
      this.forcedHash = true;
      updateHash({
        anchor: this.anchors[bestAnchorId],
        affectHistory: false,
        manager: this
      });
    } else if (!bestAnchorId && !keepLastAnchorHash) {
      removeHash({manager: this});
    }
  }

  handleHashChange = (e) => {
    this.basePath = this.getBasePath(this.anchors);

    if (this.forcedHash) {
      this.forcedHash = false;
    } else {
      this.goToSection(getHash({manager: this}));
    }
  }

  goToSection = (id) => {
    let element = this.anchors[id] ? this.anchors[id].component : null;

    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    } else {
      // make sure that standard hash anchors don't break.
      // simply jump to them.
      element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  }
}

export default new Manager()
