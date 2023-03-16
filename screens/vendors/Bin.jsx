




//For creating posts


const [isModalVisible, setModalVisible] = useState(false);
const [isPostModalVisible, setPostModalVisible] = useState(false);
const [isPortfolioModalVisible, setPortfolioModalVisible] = useState(false);

const toggleModal = () => {
  setModalVisible(true);
};

function openCreatePostModal() {
  setPostModalVisible(true);
}

function openCreatePortfolioModal() {
  setPortfolioModalVisible(true);
}


<Modal
isVisible={isModalVisible}
onBackdropPress={() => setModalVisible(false)}
>
<View
  style={{
    backgroundColor: "#fff",
    position: "absolute",
    top: 190,
    right: 0,
    borderRadius: 5,
    paddingVertical: 5,
  }}
>
  <TouchableOpacity
    style={styles.createButtonItem}
    onPress={openCreatePostModal}
  >
    <Text style={styles.createButtonItemText}>Post</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.createButtonItem}
    onPress={openCreatePortfolioModal}
  >
    <Text style={styles.createButtonItemText}>Portfolio Item</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.createButtonItem}>
    <Text style={styles.createButtonItemText}>Go Live</Text>
  </TouchableOpacity>
</View>
</Modal>

<CreatePost
isVisible={true}
onClosePress={() => setPostModalVisible(false)}
onBackdropPress={() => setPostModalVisible(false)}
/>

<CreatePortfolio
isVisible={isPortfolioModalVisible}
onClosePress={() => setPortfolioModalVisible(false)}
onBackdropPress={() => setPortfolioModalVisible(false)}
/>