import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Linking,
  StatusBar,
} from "react-native";
import { PROFILE_DATA, Project } from "./src/data/portfolioData";

export default function App() {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<string>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Animación del menú lateral (Drawer)
  const menuAnimation = useRef(new Animated.Value(-280)).current;

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? 0 : -280,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [menuVisible]);

  const navigate = (section: string) => {
    setSelectedSection(section);
    setSelectedProject(null);
    setMenuVisible(false);
  };

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log("No se pudo abrir:", error);
    }
  };

  // --- RENDERIZADO DE SECCIONES ---
  const renderHome = () => (
    <View style={styles.sectionContainer}>
      <Image
        source={require("./assets/yoxd.jpg")}
        style={styles.profileImage}
      />
      <Text style={styles.title}>{PROFILE_DATA.name}</Text>
      <Text style={styles.subtitle}>{PROFILE_DATA.role}</Text>
      <Text style={styles.description}>{PROFILE_DATA.bio}</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigate("projects")}
      >
        <Text style={styles.primaryButtonText}>Ver Proyectos</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAbout = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.headerTitle}>Información Personal</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Perfil Profesional</Text>
        <Text style={styles.cardText}>{PROFILE_DATA.bio}</Text>
        <Text style={styles.cardTitle}>Ubicación</Text>
        <Text style={styles.cardText}>{PROFILE_DATA.location}</Text>
      </View>

      <Text style={styles.headerTitle}>Habilidades y Tecnologías</Text>
      <View style={styles.skillsContainer}>
        {PROFILE_DATA.skills.map((skill, index) => (
          <View key={index} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderProjects = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.headerTitle}>Catálogo de Proyectos</Text>
      {PROFILE_DATA.projects.map((project) => (
        <TouchableOpacity
          key={project.id}
          style={styles.projectCard}
          onPress={() => setSelectedProject(project)}
        >
          <Image
            source={{ uri: project.image }}
            style={styles.projectImageThumb}
          />
          <View style={styles.projectInfo}>
            <Text style={styles.projectCardTitle}>{project.name}</Text>
            <Text numberOfLines={2} style={styles.projectCardDesc}>
              {project.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderProjectDetail = () => {
    if (!selectedProject) return null;
    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedProject(null)}
        >
          <Text style={styles.backButtonText}>← Volver al catálogo</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: selectedProject.image }}
          style={styles.detailImage}
        />
        <Text style={styles.title}>{selectedProject.name}</Text>
        <Text style={styles.description}>{selectedProject.description}</Text>

        <Text style={styles.cardTitle}>Tecnologías utilizadas:</Text>
        <View style={styles.skillsContainer}>
          {selectedProject.technologies.map((tech, idx) => (
            <View key={idx} style={styles.skillBadge}>
              <Text style={styles.skillText}>{tech}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => openLink(selectedProject.url)}
        >
          <Text style={styles.primaryButtonText}>
            Ver Repositorio en GitHub
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContact = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.headerTitle}>Contacto y Medios</Text>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => openLink(`mailto:${PROFILE_DATA.contact.email}`)}
      >
        <Text style={styles.contactLabel}>Correo Electrónico:</Text>
        <Text style={styles.contactValue}>{PROFILE_DATA.contact.email}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => openLink(PROFILE_DATA.contact.github)}
      >
        <Text style={styles.contactLabel}>GitHub:</Text>
        <Text style={styles.contactValue}>github.com/Mooncake84</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => openLink(PROFILE_DATA.contact.linkedin)}
      >
        <Text style={styles.contactLabel}>LinkedIn:</Text>
        <Text style={styles.contactValue}>Ver perfil profesional</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSection = () => {
    if (selectedProject) {
      return renderProjectDetail();
    }
    switch (selectedSection) {
      case "home":
        return renderHome();
      case "about":
        return renderAbout();
      case "projects":
        return renderProjects();
      case "contact":
        return renderContact();
      default:
        return <Text>Sección no encontrada</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header Superior */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={styles.menuIconContainer}
        >
          <Text style={styles.menuIconText}>≡</Text>
        </TouchableOpacity>
        <Text style={styles.headerAppTitle}>ProFolio</Text>
      </View>

      {/* Contenido Principal con Scroll */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderSection()}
      </ScrollView>

      {/* Menú Lateral (Drawer) Animado */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: menuAnimation }] }]}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderText}>Menú de Navegación</Text>
          <TouchableOpacity onPress={() => setMenuVisible(false)}>
            <Text style={styles.closeDrawerText}>✕</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigate("home")}
        >
          <Text style={styles.drawerItemText}>🏠 Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigate("about")}
        >
          <Text style={styles.drawerItemText}>👤 Perfil y Skills</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigate("projects")}
        >
          <Text style={styles.drawerItemText}>💼 Proyectos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigate("contact")}
        >
          <Text style={styles.drawerItemText}>📞 Contacto</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Barra de Navegación Inferior (Bottom Navigation) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigate("home")}
        >
          <Text
            style={[
              styles.navText,
              selectedSection === "home" && styles.navTextActive,
            ]}
          >
            Inicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigate("about")}
        >
          <Text
            style={[
              styles.navText,
              selectedSection === "about" && styles.navTextActive,
            ]}
          >
            Perfil
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigate("projects")}
        >
          <Text
            style={[
              styles.navText,
              selectedSection === "projects" && styles.navTextActive,
            ]}
          >
            Proyectos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigate("contact")}
        >
          <Text
            style={[
              styles.navText,
              selectedSection === "contact" && styles.navTextActive,
            ]}
          >
            Contacto
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11111B",
  },
  headerBar: {
    height: 60,
    backgroundColor: "#181825",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#313244",
  },
  menuIconContainer: {
    padding: 8,
  },
  menuIconText: {
    fontSize: 24,
    color: "#CBA6F7",
    fontWeight: "bold",
  },
  headerAppTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#CDD6F4",
    marginLeft: 16,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#CBA6F7",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#CDD6F4",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#CBA6F7",
    marginBottom: 14,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#BAC2DE",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#CDD6F4",
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#1E1E2E",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#313244",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F5C2E7",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: "#BAC2DE",
    marginBottom: 12,
    lineHeight: 18,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 16,
  },
  skillBadge: {
    backgroundColor: "#313244",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: "#89DCEB",
    fontSize: 13,
    fontWeight: "600",
  },
  projectCard: {
    backgroundColor: "#1E1E2E",
    width: "100%",
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#313244",
  },
  projectImageThumb: {
    width: 90,
    height: "100%",
  },
  projectInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  projectCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CDD6F4",
    marginBottom: 4,
  },
  projectCardDesc: {
    fontSize: 13,
    color: "#A6ADC8",
  },
  detailImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  backButtonText: {
    color: "#89DCEB",
    fontSize: 15,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#CBA6F7",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#11111B",
    fontWeight: "bold",
    fontSize: 15,
  },
  contactItem: {
    backgroundColor: "#1E1E2E",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#313244",
  },
  contactLabel: {
    color: "#F5C2E7",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  contactValue: {
    color: "#89DCEB",
    fontSize: 15,
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "#181825",
    zIndex: 100,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderRightColor: "#313244",
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  drawerHeaderText: {
    color: "#CDD6F4",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeDrawerText: {
    color: "#F38BA8",
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#313244",
  },
  drawerItemText: {
    color: "#CDD6F4",
    fontSize: 16,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#181825",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#313244",
    elevation: 10,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navText: {
    color: "#A6ADC8",
    fontSize: 12,
    fontWeight: "600",
  },
  navTextActive: {
    color: "#CBA6F7",
    fontWeight: "bold",
  },
});
