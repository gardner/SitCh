import React, { useEffect, useState } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { Helmet } from "react-helmet";
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import * as Sentry from "@sentry/browser";
import imageJson from './images0.json';
import imageIndex from './imageIndex.json';

const imageMap = new Map<string, number>(imageIndex as Array<[string, number]>);

interface ReactImageGalleryItemWithUri extends ReactImageGalleryItem {
  uri: string;
}

function Gallery() {
  const { trackPageView, trackEvent } = useMatomo()
  const [images, setImages] = useState<ReactImageGalleryItemWithUri[]>(imageJson as ReactImageGalleryItemWithUri[]);
  const [startIndex, setStartIndex] = useState(0);
  const [title, setTitle] = useState('SitCh.nz');
  const [seatId, setSeatId ] = useState(-1);

  useEffect(() => {
    // Grab the seatId from the uri, if present
    const uri = window.location.href.split('/').pop();
    const id = uri?.split('-')[0];
    if (id) {
      console.log('Set seatId to ' + id);
      setSeatId(parseInt(id));
    }
    trackPageView()
  }, []);

  useEffect(() => {
    if (seatId && seatId > 0) {
      const offset = imageMap.get(seatId.toString());
      const alreadyHaveIt = images.find(image => image.thumbnailAlt == seatId.toString());
      console.log('offset, alreadyHaveIt ', offset, alreadyHaveIt);
      if (offset && alreadyHaveIt === undefined) {
        loadMore(offset);
      }
    }
  }, [seatId]);

  useEffect(() => {
    let indexFromUrl = 0;
    // debugger;
    images.forEach((image, index) => {
      if (image.thumbnailAlt == seatId.toString()) {
        indexFromUrl = index;
      }
    });

    if (indexFromUrl !== startIndex) {
      console.log('Set start index to ' + indexFromUrl);
      setStartIndex(indexFromUrl);
    }

  }, [images, seatId]);

  const loadMore = async (idx: number) => {
    const response = await fetch(`/data/images${idx}.json`);
    const newImages = await response.json();
    setStartIndex(idx);
    setImages(images.concat(newImages));
  }

  return (
    <div className="App">
      <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href="http://SitCh.nz" />
          <meta property="og:description" content="A structure designed to support a person in the sitting position." data-rh="true" />
      </Helmet>
      <ImageGallery
        additionalClass='sitch-image-gallery'
        infinite={false}
        items={images}
        lazyLoad={true}
        startIndex={startIndex}
        showIndex={true}
        thumbnailPosition="top"
        slideInterval={7000}
        onThumbnailError={(e) => {
          Sentry.captureException(e);
        }}
        onSlide={(index: number) => {
          const image: ReactImageGalleryItemWithUri = images[index];
          if (index > images.length - 5) {
            loadMore(images.length);
            console.log('Loaded more images', images.length - 5);
            if (image?.thumbnailAlt) {
              setSeatId(Number.parseInt(image?.thumbnailAlt));
            }
            setStartIndex(images.length - 5);
          }
          const title = image.originalTitle || "";
          setTitle(`SitCh.nz - ${title}`);
          const pathname = image.uri;
          trackEvent({ category: 'slide', action: pathname })
          window.history.replaceState(null, title, pathname);
        }}
      />
      <footer>
        <p>Random acts of data <a href="mailto:info@sitch.nz">contact</a></p>
      </footer>
    </div>
  );
}

export default Gallery;
