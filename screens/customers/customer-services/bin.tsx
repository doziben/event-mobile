
  <View style={styles.container}>
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.addServiceModal}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View>
            <Text style={{ fontFamily: "MontserratBold", fontSize: 16 }}>
              Add Rate
            </Text>
            <Text
              style={{
                fontFamily: "OpenSansRegular",
                fontSize: 14,
                color: "#767676",
              }}
            >
              Enter your rates for this service
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 40 }}>
          <AddServiceInput
            name="Enter base rate"
            placeholder="Enter base rate"
            onChangeText={(value) => setServiceBaseRate(value)}
          />
          <AddServiceInput
            name="Enter hourly rate"
            placeholder="Enter hourly rate"
            onChangeText={(value) => setServiceHourlyRate(value)}
          />
          <AddServiceInput
            name="Enter rehearsal rate"
            placeholder="Enter rehearsal rate"
            onChangeText={(value) => setServiceRehearsalRate(value)}
          />

          <TouchableOpacity
            onPress={addServiceNow}
            style={{
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DE8E0E",
              borderRadius: 5,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "OpenSansSemiBold",
                fontSize: 14,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FAFAFA",
              borderRadius: 5,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "#767676",
                fontFamily: "OpenSansSemiBold",
                fontSize: 14,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Ionicons
        name="arrow-back-outline"
        size={16}
        style={{ marginRight: 5 }}
      />
      <Text style={{ fontFamily: "OpenSansBold", fontSize: 14 }}>{name}</Text>
    </TouchableOpacity>


        return exist ? (
          {/* <ActiveSubServiceItem
            style={styles.addedServiceStyle}
            key={item.id}
            name={item.name}
            imageUrl={item.image}
            //mutate data to remove services
            onPress={() =>
              removeServiceMutation.mutate({
                name: item.name,
              })
            }
          />
        ) : (
          <InactiveSubServiceItem
            style={styles.notAddedServiceStyle}
            key={item.id}
            name={item.name}
            imageUrl={item.image}
            //open service modal and mutate data
            onPress={() => openServiceModal(item.id, item.name)}
          />
        );
      })} */}
    </ScrollView>
  </View>
);
}

//add service text input component
function AddServiceInput(props) {
return (
  <View style={{ marginBottom: 20 }}>
    <View
      style={{ marginBottom: 5, flexDirection: "row", alignItems: "center" }}
    >
      <Text
        style={{
          fontFamily: "OpenSansSemiBold",
          color: "#343434",
          fontSize: 12,
        }}
      >
        {props.name}
      </Text>
      <Ionicons
        style={{ marginLeft: 4, alignSelf: "flex-end" }}
        name="help-circle"
        size={14}
        color="#343434"
      />
    </View>

    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#D2D2D2",
        backgroundColor: "#FAFAFA",
      }}
    >
      <View
        style={{
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
          borderRightWidth: 0.5,
          borderColor: "#D2D2D2",
        }}
      >
        <Text
          style={{
            fontFamily: "OpenSansSemiBold",
            fontSize: 14,
            color: "#767676",
          }}
        >
          $
        </Text>
      </View>
      <TextInput
        style={{
          flex: 2,
          paddingLeft: 5,
          fontFamily: "OpenSansSemiBold",
          fontSize: 14,
          color: "#767676",
        }}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
      />
    </View>
  </View>
);
}


//inactive sub category component
function InactiveSubServiceItem(props) {
return (
  <TouchableOpacity onPress={props.onPress}>
    <ImageBackground source={props.imageUrl} style={props.style}>
      <Text
        style={{
          fontFamily: "OpenSansBold",
          marginVertical: 4,
          fontSize: 14,
          color: "#fff",
        }}
      >
        {props.name}
      </Text>
    </ImageBackground>
  </TouchableOpacity>
);
}

//active sub category component
function ActiveSubServiceItem(props) {
return (
  <TouchableOpacity onPress={props.onPress}>
    <ImageBackground source={props.imageUrl} style={props.style}>
      <View
        style={{
          backgroundColor: "#DE8E0E",
          flex: 1,
          width: 180,
          opacity: 0.7,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="checkmark-circle" color="#fff" size={24} />
        <Text
          style={{
            fontFamily: "OpenSansBold",
            marginVertical: 4,
            fontSize: 14,
            color: "#fff",
          }}
        >
          {props.name}
        </Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);
}

// function NoServiceAdded(props) {
// return (
//   <View style={styles.serviceAddButton}>
//     <Text style={styles.serviceAddButtonText}>Service {props.id}</Text>
//     <Ionicons name="add" color="#DE8E0E" size={20} />
//   </View>
// );
// }

// //display component when service is added
// function ServiceAdded(props) {
// return (
//   <TouchableOpacity style={styles.serviceAddedButton} onPress={props.onPress}>
//     <Text style={styles.serviceAddButtonText}>{props.name}</Text>
//   </TouchableOpacity>
// );