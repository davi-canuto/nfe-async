package com.nfeasync.sign_xml_service.signer;

import lombok.RequiredArgsConstructor;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.crypto.dsig.*;
import javax.xml.crypto.dsig.dom.DOMSignContext;
import javax.xml.crypto.dsig.keyinfo.KeyInfo;
import javax.xml.crypto.dsig.keyinfo.KeyInfoFactory;
import javax.xml.crypto.dsig.keyinfo.X509Data;
import javax.xml.crypto.dsig.spec.C14NMethodParameterSpec;
import java.security.PrivateKey;
import java.security.cert.X509Certificate;
import java.util.List;

@RequiredArgsConstructor
public class XmlSigner {

    private final PrivateKey privateKey;
    private final X509Certificate certificate;

    public Document sign(Document document) throws Exception {
        XMLSignatureFactory factory = XMLSignatureFactory.getInstance("DOM");

        Element elementToSign = null;
        String id = null;

        var allElements = document.getElementsByTagName("*");
        for (int i = 0; i < allElements.getLength(); i++) {
            Element el = (Element) allElements.item(i);
            if (el.hasAttribute("Id")) {
                elementToSign = el;
                id = el.getAttribute("Id");
                el.setIdAttribute("Id", true);
                break;
            }
        }

        if (elementToSign == null || id == null || id.isEmpty()) {
            throw new Exception("Nenhum elemento com atributo 'Id' encontrado no XML.");
        }

        Transform enveloped = factory.newTransform(Transform.ENVELOPED, (C14NMethodParameterSpec) null);
        Transform canonicalization = factory.newTransform(CanonicalizationMethod.INCLUSIVE, (C14NMethodParameterSpec) null);

        Reference ref = factory.newReference(
                "#" + id,
                factory.newDigestMethod(DigestMethod.SHA1, null),
                List.of(enveloped, canonicalization),
                null,
                null
        );

        SignedInfo signedInfo = factory.newSignedInfo(
                factory.newCanonicalizationMethod(
                        CanonicalizationMethod.INCLUSIVE,
                        (C14NMethodParameterSpec) null
                ),
                factory.newSignatureMethod(SignatureMethod.RSA_SHA1, null),
                List.of(ref)
        );

        KeyInfoFactory kif = factory.getKeyInfoFactory();
        X509Data x509Data = kif.newX509Data(List.of(certificate));
        KeyInfo keyInfo = kif.newKeyInfo(List.of(x509Data));

        DOMSignContext domSignContext = new DOMSignContext(privateKey, elementToSign);
        domSignContext.setDefaultNamespacePrefix("ds");

        XMLSignature signature = factory.newXMLSignature(signedInfo, keyInfo);
        signature.sign(domSignContext);

        return document;
    }
}
