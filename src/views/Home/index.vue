
<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'
// import HomePanel  from './components/HomePanel.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
  <!-- <HomePanel title="新鲜好物" subTitle="新鲜好物推荐">
    <div>
      我是新鲜好物的插槽
    </div>
  </HomePanel>
  <HomePanel title="人物推荐" subTitle="人物推荐推荐">
    <div>
      我是人气推荐的插槽
    </div> -->
<!-- </HomePanel> -->
 <!-- <HomeBanner title="新鲜好物">

 </HomeBanner>
 <HomeBanner title="人物推荐">
  
 </HomeBanner> -->

</template>