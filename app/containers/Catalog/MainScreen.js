import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import productSelectors from '../../selectors/product';
import { getCollections } from '../../actions/product';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Catalog',
  };

  static propTypes = {
    collections: PropTypes.array,
    collectionsComponent: PropTypes.object,
    getCollections: PropTypes.func,
  }

  componentWillMount() {
    this.props.getCollections();
  }

  loading() {
    return (
      <View style={styles.loadingContainer}>
        {/* TODO: get a loading animation */}
        <Text style={styles.loadingMessage}>
          Loading...
        </Text>
      </View>
    );
  }

  list() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {_.map(this.props.collections, (collection) =>
            <View style={styles.collectionsContainer} key={collection.Id}>
              <Image source={{ uri: collection.CoverImgUri }} style={styles.collectionCoverImg} />
              <View style={styles.collectionTextContainer}>
                <Text style={styles.collectionTitle}>
                  {collection.Title} by {collection.Author}
                </Text>
                <Text ellipsizeMode={'tail'} numberOfLines={2}>
                  {collection.Description}
                </Text>
                <Text style={{ color: Colors.ray }}>
                  {moment(collection.Timestamp).fromNow()}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  render() {
    if (this.props.collectionsComponent.awaitingApiData) {
      return this.loading();
    }
    return this.list();
  }
}

const mapStateToProps = () => createStructuredSelector({
  collections: productSelectors.selectCollections(),
  collectionsComponent: productSelectors.selectCollectionsComponent(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCollections: () => {
      dispatch(getCollections());
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingRight: 55,
    paddingLeft: 55,
    alignItems: 'center',
  },
  loadingMessage: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    alignItems: 'center',
  },
  collectionsContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 16,
  },
  collectionTextContainer: {
    flex: 1,
    padding: 16,
  },
  collectionCoverImg: {
    height: 325,
    width: 325,
  },
  collectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
