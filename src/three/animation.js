import * as THREE from "three";

export function startAnimation(
    renderer,
    scene,
    camera,
    mixer,
    orb,
    orbGroup,
    mouse,
    baseRotation,
    isScrolling
) {

    const clock = new THREE.Clock();

    function animate() {

        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        if (mixer) mixer.update(delta);

        if (orb) {

            if (!isScrolling()) {

                const targetRotX = baseRotation.x + mouse.y * 0.18;
                const targetRotY = baseRotation.y + mouse.x * 0.35;

                orb.rotation.x += (targetRotX - orb.rotation.x) * 0.05;
                orb.rotation.y += (targetRotY - orb.rotation.y) * 0.05;

                const time = performance.now() * 0.001;

                const targetX = 2.9 + mouse.x * 0.25;
                const targetY =
                    -0.2 +
                    mouse.y * 0.12 +
                    Math.sin(time * 1.2) * 0.08;

                orbGroup.position.x +=
                    (targetX - orbGroup.position.x) * 0.05;

                orbGroup.position.y +=
                    (targetY - orbGroup.position.y) * 0.05;
            }

            orb.rotation.z += 0.002;
        }

        renderer.render(scene, camera);
    }

    animate();
}