<template>
    <div className="h-screen w-screen overflow-hidden p-0 m-0 absolute top-0 left-0 right-0 bottom-0 group flex justify-center items-center bg-black">
        <video preload="metadata" ref="video" autoplay loop muted src="/Video/mfforsite.mp4" class="absolute top-0 left-0 w-full h-full object-cover scale-125 blur-sm group-hover:scale-100 group-hover:blur-none transition-all duration-300 ease-out"></video>
        <img src="public/mflogosquare.png" class="pointer-events-none w-full max-w-60 relative sm:hidden group-hover:opacity-5 transition-all ease-out">
        <img src="public/mflogobig.png" class="pointer-events-none w-full max-w-screen-md relative hidden sm:block group-hover:opacity-5 transition-all ease-out">
    </div>
</template>