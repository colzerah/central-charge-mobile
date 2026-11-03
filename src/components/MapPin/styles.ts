import { StyleSheet } from "react-native";

// O desenho usa o viewBox 24x24 do lucide; aqui ele é recortado em volta
// da gota (com folga para a borda e a sombra) e ampliado SCALE vezes.
const SCALE = 2;
const VIEWBOX = { x: 2.75, y: 1.25, width: 18.5, height: 22.5 };
// centro da cabeça da gota no viewBox do lucide
const HEAD_CENTER = { x: 12, y: 10 };
// ponta de baixo da gota no viewBox do lucide (fica acima da borda da
// imagem por causa da folga da sombra)
const TIP = { x: 12, y: 22 };
const HEAD_RADIUS = 6.25;
const ICON_SIZE = 16;
// diâmetro do miolo em px: a imagem ocupa exatamente esse círculo
const CENTER_SIZE = HEAD_RADIUS * 2 * SCALE;

export const PIN = {
  width: VIEWBOX.width * SCALE,
  height: VIEWBOX.height * SCALE,
  // posição da ponta, em px, a partir do canto de cima da imagem
  tipX: (TIP.x - VIEWBOX.x) * SCALE,
  tipY: (TIP.y - VIEWBOX.y) * SCALE,
  viewBox: `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`,
  // 1.5 unidades * SCALE = borda de 3px, igual à do pin antigo
  strokeWidth: 1.5,
  // miolo dentro da cabeça da gota (raio 8 no lucide): com 6.25
  // fica um anel colorido de ~3.5px em volta, e 25px de diâmetro
  head: { ...HEAD_CENTER, radius: HEAD_RADIUS },
  shadowOffset: 0.8,
  iconSize: ICON_SIZE,
};

export const styles = StyleSheet.create({
  wrapper: {
    width: PIN.width,
    height: PIN.height,
  },
  iconWrap: {
    position: "absolute",
    left: (HEAD_CENTER.x - VIEWBOX.x) * SCALE - ICON_SIZE / 2,
    top: (HEAD_CENTER.y - VIEWBOX.y) * SCALE - ICON_SIZE / 2,
  },
  centerImage: {
    position: "absolute",
    left: (HEAD_CENTER.x - VIEWBOX.x) * SCALE - CENTER_SIZE / 2,
    top: (HEAD_CENTER.y - VIEWBOX.y) * SCALE - CENTER_SIZE / 2,
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
  },
});
