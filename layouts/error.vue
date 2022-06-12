<template>
    <div class="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8 error-wrapper">
        <div class="max-w-max mx-auto">
            <main class="sm:flex">
                <p class="text-6xl font-extrabold text-gray-900">404</p>
                <div class="sm:ml-6">
                    <div class="sm:border-l sm:border-gray-200 sm:pl-6">
                        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Stranica nije
                            pronađena</h1>
                        <p class="mt-1 text-base text-gray-500">Provjerite URL link, ili pokušajte ponovo.</p>
                    </div>
                    <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                        <button @click="$router.push('/')"
                                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm shadow-sm text-white bg-gray-900 hover:bg-gray-800">
                            Nazad na početnu
                        </button>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "error"
}
</script>

<style scoped lang="scss">
.error-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
